package com.PlugNPlay.www.service;
import com.PlugNPlay.www.dto.UserRequest;


public interface UserService {

    //Create User
    UserRequest createUser(UserRequest user);

    //Get User By Email
    UserRequest getUserByEmail(String email);

    //Update User
    UserRequest updateUser(UserRequest UserRequest, String userId);

    //Delete User
    void deleteUser(String userId);

    //Get User By Id
    UserRequest getUserById(String userId);

    //Get All Users
    Iterable<UserRequest> getAllUsers();

}
