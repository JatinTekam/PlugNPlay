package com.PlugNPlay.www.service;

import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.enums.Provider;
import com.PlugNPlay.www.exceptions.ResourceNotFoundException;
import com.PlugNPlay.www.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDto) {

        if (userDto.getName() != null && userDto.getName().isBlank()) {
            throw new IllegalArgumentException("Name Is Required");
        }

        if (userDto.getEmail() != null && userDto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email Is Required");
        }

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("Email Already Exists");
        }

        if(userDto.getPassword()==null || userDto.getPassword().isBlank()){
            throw new IllegalArgumentException("Password Is Required");
        }

        User user = modelMapper.map(userDto, User.class);

        user.setProvider(userDto.getProvider()!=null ? userDto.getProvider() : Provider.LOCAL);

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser,UserDTO.class);
    }

    //Get User By Email
    @Override
    public UserDTO getUserByEmail(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found With Given Email"));

        return modelMapper.map(user,UserDTO.class);

    }

    @Override
    public UserDTO updateUser(UserDTO userDto, String userId) {
        return null;
    }

    @Override
    public void deleteUser(String userId) {

    }

    @Override
    public UserDTO getUserById(String userId) {
        return null;
    }

    @Override
    public Iterable<UserDTO> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user->
                modelMapper.map(user,UserDTO.class)
                ).toList();
    }
}
