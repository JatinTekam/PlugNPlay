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
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final JWTService jwtService;
    private final ModelMapper modelMapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieService cookieService;

    public AuthController(AuthService authService,JWTService jwtService, ModelMapper modelMapper, RefreshTokenRepository refreshTokenRepository, CookieService cookieService) {
        this.authService = authService;
        this.jwtService=jwtService;
        this.modelMapper = modelMapper;
        this.refreshTokenRepository = refreshTokenRepository;
        this.cookieService = cookieService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        TokenResponse tokenResponse = authService.loginUser(loginRequest, response);
        return ResponseEntity.ok(tokenResponse);
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
        TokenResponse tokenResponse = authService.generateNewRefreshToken(body, response, request);
        return ResponseEntity.ok(tokenResponse);
    }

    //Logout User
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response){
        authService.logoutUser(request,response);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
