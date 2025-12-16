package com.PlugNPlay.www.controller;


import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.service.AuthService;
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

    @PostMapping("/register")
    public ResponseEntity<UserDTO> userRegister(@RequestBody UserDTO userDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userDTO));
    }
}
