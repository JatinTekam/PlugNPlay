package com.PlugNPlay.www.service;
import com.PlugNPlay.www.dto.UserDto;

import java.util.UUID;


public interface UserService {

    //Create User
    UserDto createUser(UserDto user);

    //Get User By Email
    UserDto getUserByEmail(String email);

    //Update User
    UserDto updateUser(UserDto userDto,String userId);

    //Delete User
    void deleteUser(String userId);

    //Get User By Id
    UserDto getUserById(String userId);

    //Get All Users
    Iterable<UserDto> getAllUsers();


}
