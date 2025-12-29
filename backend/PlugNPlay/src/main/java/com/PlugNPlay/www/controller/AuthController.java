package com.PlugNPlay.www.controller;
import com.PlugNPlay.www.dto.LoginRequest;
import com.PlugNPlay.www.dto.RefreshTokenRequest;
import com.PlugNPlay.www.dto.TokenResponse;
import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.entity.RefreshToken;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.repository.RefreshTokenRepository;
import com.PlugNPlay.www.repository.UserRepository;
import com.PlugNPlay.www.service.AuthService;
import com.PlugNPlay.www.service.CookieService;
import com.PlugNPlay.www.service.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final ModelMapper modelMapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieService cookieService;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, UserRepository userRepository, JWTService jwtService, ModelMapper modelMapper, RefreshTokenRepository refreshTokenRepository, CookieService cookieService) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.userRepository=userRepository;
        this.jwtService=jwtService;
        this.modelMapper = modelMapper;
        this.refreshTokenRepository = refreshTokenRepository;
        this.cookieService = cookieService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){

        Authentication authenticate = authenticate(loginRequest);

        User user=userRepository.findByEmail(loginRequest.email()).orElseThrow(()-> new BadCredentialsException("invalid username or password"));
        if(!user.isEnable()){
            throw  new DisabledException("User is disable");
        }

        //Refresh Token
        String jti= UUID.randomUUID().toString();
        RefreshToken refreshTokenDb=new RefreshToken();
        refreshTokenDb.setJti(jti);
        refreshTokenDb.setUser(user);
        refreshTokenDb.setCreatedAt(Instant.now());
        refreshTokenDb.setExpiredAt(Instant.now().plusSeconds(jwtService.getRefreshTTLSecond()));
        refreshTokenDb.setRevoked(false);


        refreshTokenRepository.save(refreshTokenDb);


        //Generate Access Token
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken=jwtService.generateRefreshToken(user,refreshTokenDb.getJti());

        cookieService.attachRefreshCookie(response,refreshToken, (int)jwtService.getRefreshTTLSecond());
        cookieService.addNoStoreHeader(response);

        TokenResponse tokenResponse = TokenResponse.of(accessToken, refreshToken, jwtService.getAccessTTLSecond(), modelMapper.map(user, UserDTO.class));

        return ResponseEntity.ok(tokenResponse);
    }

    private Authentication authenticate(LoginRequest loginRequest) {
        try{
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(),loginRequest.password()));
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid Username or Password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> userRegister(@RequestBody UserDTO userDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userDTO));
    }

    //Renew Access And Refresh Token
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(
            @RequestBody(required = false) RefreshTokenRequest body,
            HttpServletResponse response,
            HttpServletRequest request
            ){

        String refreshToken=readRefreshTokenFromRequest(body,request).orElseThrow(()-> new BadCredentialsException("Refresh Token Is Missing"));

        if(!jwtService.isRefreshToken(refreshToken)){
            throw new BadCredentialsException("Invalid Refresh Token");
        }

        String jti = jwtService.getJti(refreshToken);
        UUID userId = jwtService.getUserId(refreshToken);
        RefreshToken storedRefreshToken = refreshTokenRepository.findByJti(jti).orElseThrow(() -> new BadCredentialsException("Refresh Token Not Recognized"));

        if(storedRefreshToken.isRevoked()){
            throw new BadCredentialsException("Refresh token expired or revoked");
        }

        if(storedRefreshToken.getExpiredAt().isBefore(Instant.now())){
            throw new BadCredentialsException("Refresh token expired");
        }

        if(!storedRefreshToken.getUser().getId().equals(userId)){
            throw new BadCredentialsException("Refresh Token Dose Not Belong To This User");
        }

        storedRefreshToken.setRevoked(true);
        String newJti=UUID.randomUUID().toString();
        storedRefreshToken.setReplacedByToken(newJti);
        refreshTokenRepository.save(storedRefreshToken);

        User user = storedRefreshToken.getUser();

        var newRefreshTokenDb= new RefreshToken();
        newRefreshTokenDb.setJti(newJti);
        newRefreshTokenDb.setUser(user);
        newRefreshTokenDb.setCreatedAt(Instant.now());
        newRefreshTokenDb.setExpiredAt(Instant.now().plusSeconds(jwtService.getRefreshTTLSecond()));
        newRefreshTokenDb.setRevoked(false);

        refreshTokenRepository.save(newRefreshTokenDb);

        String newAccessToken=jwtService.generateAccessToken(user);
        String newRefreshToken=jwtService.generateRefreshToken(user,newRefreshTokenDb.getJti());
        cookieService.attachRefreshCookie(response,newRefreshToken,(int)jwtService.getRefreshTTLSecond());
        cookieService.addNoStoreHeader(response);
        return ResponseEntity.ok(TokenResponse.of(newAccessToken,newRefreshToken, jwtService.getAccessTTLSecond(), modelMapper.map(user,UserDTO.class)));
    }


    //Getting Refresh Token From Body Or Request
    private Optional<String> readRefreshTokenFromRequest(RefreshTokenRequest body, HttpServletRequest request) {

        if(request.getCookies()!=null){
            Optional<String> cookie = Arrays.stream(request.getCookies())
                    .filter(c -> cookieService.getRefreshTokenCookieName().equals(c.getName()))
                    .map(Cookie::getValue)
                    .filter(v -> !v.isBlank())
                    .findFirst();

            if (cookie.isPresent()){
                return cookie;
            }
        }

        if(body!=null && body.refreshToken()!=null && !body.refreshToken().isBlank()){
            return Optional.of(body.refreshToken());
        }

        String refreshHeader=request.getHeader("X-Refresh-Token");
        if(refreshHeader!=null && !refreshHeader.isBlank()){
            return Optional.of(refreshHeader.trim());
        }

        return Optional.empty();

    }
}
