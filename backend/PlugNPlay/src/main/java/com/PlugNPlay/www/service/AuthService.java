package com.PlugNPlay.www.service;

import com.PlugNPlay.www.dto.LoginRequest;
import com.PlugNPlay.www.dto.RefreshTokenRequest;
import com.PlugNPlay.www.dto.TokenResponse;
import com.PlugNPlay.www.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


//This Class Contains All User Auth Related Logic

public interface AuthService {

    //Register User
    UserDTO registerUser(UserDTO userDTO);

    //Login User
    TokenResponse loginUser(LoginRequest loginRequest, HttpServletResponse response);

    //Logout User
    void logoutUser(HttpServletRequest request, HttpServletResponse response);

    //Renew Access And Refresh Token
    TokenResponse generateNewRefreshToken(RefreshTokenRequest body, HttpServletResponse response, HttpServletRequest request);
}
