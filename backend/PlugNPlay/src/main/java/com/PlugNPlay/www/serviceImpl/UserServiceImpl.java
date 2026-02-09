package com.PlugNPlay.www.serviceImpl;

import com.PlugNPlay.www.dto.UserRequest;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.enums.Provider;
import com.PlugNPlay.www.exceptions.ResourceNotFoundException;
import com.PlugNPlay.www.repository.CodeSnippestRepository;
import com.PlugNPlay.www.repository.UserRepository;
import com.PlugNPlay.www.service.UserService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, CodeSnippestRepository codeSnippestRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    @Transactional
    public UserRequest createUser(UserRequest userRequest) {

        if (userRequest.getName() == null && userRequest.getName().isBlank()) {
            throw new IllegalArgumentException("Name Is Required");
        }

        if (userRequest.getEmail() == null && userRequest.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email Is Required");
        }

        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new IllegalArgumentException("Email Already Exists");
        }

        if(userRequest.getPassword()==null || userRequest.getPassword().isBlank()){
            throw new IllegalArgumentException("Password Is Required");
        }


        User user = modelMapper.map(userRequest, User.class);

        user.setProvider(userRequest.getProvider()!=null ? userRequest.getProvider() : Provider.LOCAL);

        User savedUser = userRepository.saveAndFlush(user);

        return modelMapper.map(savedUser, UserRequest.class);
    }

    //Get User By Email
    @Override
    public UserRequest getUserByEmail(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found With Given Email"));

        user.setPassword(null);
        return modelMapper.map(user, UserRequest.class);

    }

    @Override
    @Transactional
    public UserRequest updateUser(UserRequest userRequest, String userId) {
        UUID uid = UUID.fromString(userId);
        User dbUser = userRepository
                   .findById(uid)
                   .orElseThrow(() -> new ResourceNotFoundException("User Not Found With Given Id"));

        if(userRequest.getName()!=null) dbUser.setName(userRequest.getName());
        if(userRequest.getProvider()!=null) dbUser.setProvider(userRequest.getProvider());

        if(userRequest.getPassword()!=null) dbUser.setPassword(userRequest.getPassword());

        dbUser.setEnable(userRequest.isEnable());
        dbUser.setUpdatedTime(LocalDateTime.now());
        User updatadedUser = userRepository.save(dbUser);

        return modelMapper.map(updatadedUser, UserRequest.class);
    }

    @Override
    public void deleteUser(String userId) {
        UUID uid = UUID.fromString(userId);
        User user = userRepository
                .findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found With Given Id"));

        userRepository.delete(user);
    }

    @Override
    public UserRequest getUserById(String userId) {
        UUID uid = UUID.fromString(userId);
        User user = userRepository.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found With Given Id"));

        user.setPassword(null);
        return modelMapper.map(user, UserRequest.class);
    }

    @Override
    public Iterable<UserRequest> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user->
                modelMapper.map(user, UserRequest.class)
                ).toList();
    }


}
