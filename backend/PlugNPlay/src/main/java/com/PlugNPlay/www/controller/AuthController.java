package com.PlugNPlay.www.controller;


import com.PlugNPlay.www.dto.LoginRequest;
import com.PlugNPlay.www.dto.TokenResponse;
import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.repository.UserRepository;
import com.PlugNPlay.www.service.AuthService;
import com.PlugNPlay.www.service.JWTService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final ModelMapper modelMapper;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, UserRepository userRepository, JWTService jwtService, ModelMapper modelMapper) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.userRepository=userRepository;
        this.jwtService=jwtService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest){
        System.out.println(loginRequest);
        Authentication authenticate = authenticate(loginRequest);

        User user=userRepository.findByEmail(loginRequest.email()).orElseThrow(()-> new BadCredentialsException("Invalid Username or Password"));
        if(!user.isEnable()){
            throw  new DisabledException("User is disable");
        }

        //Generate Access Token
        String accessToken = jwtService.generateAccessToken(user);

        TokenResponse tokenResponse = TokenResponse.of(accessToken, "", jwtService.getAccessTTLSecond(), modelMapper.map(user, UserDTO.class));

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
}
