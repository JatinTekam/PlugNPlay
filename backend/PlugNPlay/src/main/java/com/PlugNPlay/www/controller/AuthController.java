package com.PlugNPlay.www.controller;
import com.PlugNPlay.www.dto.LoginRequest;
import com.PlugNPlay.www.dto.RefreshTokenRequest;
import com.PlugNPlay.www.dto.TokenResponse;
import com.PlugNPlay.www.dto.UserRequest;
import com.PlugNPlay.www.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        TokenResponse tokenResponse = authService.loginUser(loginRequest, response);
        return ResponseEntity.ok(tokenResponse);
    }


    @PostMapping("/register")
    public ResponseEntity<UserRequest> userRegister(@RequestBody UserRequest userRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userRequest));
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
