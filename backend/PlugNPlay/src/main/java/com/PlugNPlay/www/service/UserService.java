package com.PlugNPlay.www.service;
import com.PlugNPlay.www.dto.CodeSnippestDto;
import com.PlugNPlay.www.dto.CodeSnippestResponse;
import com.PlugNPlay.www.dto.UserDTO;


import java.util.UUID;


public interface UserService {

    //Create User
    UserDTO createUser(UserDTO user);

    //Get User By Email
    UserDTO getUserByEmail(String email);

    //Update User
    UserDTO updateUser(UserDTO UserDTO,String userId);

    //Delete User
    void deleteUser(String userId);

    //Get User By Id
    UserDTO getUserById(String userId);

    //Get All Users
    Iterable<UserDTO> getAllUsers();

    //Save User Code
    CodeSnippestResponse saveUserCode(CodeSnippestDto codeSnippestDto);


}
