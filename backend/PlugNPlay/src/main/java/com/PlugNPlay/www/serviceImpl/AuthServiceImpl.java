package com.PlugNPlay.www.serviceImpl;

import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.service.AuthService;
import com.PlugNPlay.www.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userService.createUser(userDTO);
    }
}
