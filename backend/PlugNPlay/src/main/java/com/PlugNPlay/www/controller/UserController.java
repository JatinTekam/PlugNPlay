package com.PlugNPlay.www.controller;
import com.PlugNPlay.www.dto.CodeDto;
import com.PlugNPlay.www.dto.CodeSnippestDto;
import com.PlugNPlay.www.dto.CodeSnippestResponse;
import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.exceptions.ResourceNotFoundException;
import com.PlugNPlay.www.repository.CodeRepo;
import com.PlugNPlay.www.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/api/v1/user")

public class UserController {

    private final UserService userService;
    private final CodeRepo codeRepo;


    @Autowired
    public UserController(UserService userService, CodeRepo codeRepo) {
        this.userService = userService;
        this.codeRepo = codeRepo;
    }


    //Create User In Database
    @PostMapping()
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
    }

    //Get All Users
    @GetMapping()
    public ResponseEntity<Iterable<UserDTO>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    //Get User By Email
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    //Delete User By Id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
    }

    //Update The User
    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO,@PathVariable String userId){
        return ResponseEntity.ok(userService.updateUser(userDTO,userId));
    }


    //Get User By Id
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PostMapping("/code")
    public ResponseEntity<CodeSnippestResponse> saveCode(@RequestBody CodeSnippestDto codeSnippestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUserCode(codeSnippestDto));
    }

    @PostMapping("/snippest/{id}")
    public ResponseEntity<?> getSnippest(@PathVariable UUID id){

        System.out.println(id);
        return ResponseEntity.ok(codeRepo.getCodeSnippestById(id));
    }









}
