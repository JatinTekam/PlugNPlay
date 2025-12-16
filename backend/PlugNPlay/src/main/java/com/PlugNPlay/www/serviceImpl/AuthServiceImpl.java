package com.PlugNPlay.www.serviceImpl;

import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.service.AuthService;
import com.PlugNPlay.www.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    public AuthServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        return userService.createUser(userDTO);
    }
}
