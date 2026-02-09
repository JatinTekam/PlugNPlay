package com.PlugNPlay.www.controller;
import com.PlugNPlay.www.dto.UserRequest;
import com.PlugNPlay.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/user")

public class UserController {

    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    //Create User In Database
    @PostMapping()
    public ResponseEntity<UserRequest> createUser(@RequestBody UserRequest userRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userRequest));
    }

    //Get All Users
    @GetMapping()
    public ResponseEntity<Iterable<UserRequest>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    //Get User By Email
    @GetMapping("/email/{email}")
    public ResponseEntity<UserRequest> getUserByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    //Delete User By Id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
    }

    //Update The User
    @PutMapping("/{userId}")
    public ResponseEntity<UserRequest> updateUser(@RequestBody UserRequest userRequest, @PathVariable String userId){
        return ResponseEntity.ok(userService.updateUser(userRequest,userId));
    }


    //Get User By Id
    @GetMapping("/{userId}")
    public ResponseEntity<UserRequest> getUserById(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }

}
