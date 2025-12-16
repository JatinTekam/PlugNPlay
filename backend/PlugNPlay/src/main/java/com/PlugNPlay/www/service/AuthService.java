package com.PlugNPlay.www.service;

import com.PlugNPlay.www.dto.UserDTO;


//This Class Contains All User Auth Related Logic

public interface AuthService {

    //Register User
    UserDTO registerUser(UserDTO userDTO);

}
