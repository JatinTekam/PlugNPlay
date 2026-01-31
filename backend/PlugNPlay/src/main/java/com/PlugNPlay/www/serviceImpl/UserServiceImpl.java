package com.PlugNPlay.www.serviceImpl;

import com.PlugNPlay.www.dto.CodeDto;
import com.PlugNPlay.www.dto.CodeSnippestDto;
import com.PlugNPlay.www.dto.CodeSnippestResponse;
import com.PlugNPlay.www.dto.UserDTO;
import com.PlugNPlay.www.entity.Code;
import com.PlugNPlay.www.entity.CodeSnippest;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final CodeSnippestRepository codeSnippestRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, CodeSnippestRepository codeSnippestRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.codeSnippestRepository = codeSnippestRepository;
    }


    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDto) {

        if (userDto.getName() == null && userDto.getName().isBlank()) {
            throw new IllegalArgumentException("Name Is Required");
        }

        if (userDto.getEmail() == null && userDto.getEmail().isBlank()) {
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

        User savedUser = userRepository.saveAndFlush(user);

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
    @Transactional
    public UserDTO updateUser(UserDTO userDto, String userId) {
        UUID uid = UUID.fromString(userId);
        User dbUser = userRepository
                   .findById(uid)
                   .orElseThrow(() -> new ResourceNotFoundException("User Not Found With Given Id"));

        if(userDto.getName()!=null) dbUser.setName(userDto.getName());
        if(userDto.getProvider()!=null) dbUser.setProvider(userDto.getProvider());

        if(userDto.getPassword()!=null) dbUser.setPassword(userDto.getPassword());

        dbUser.setEnable(userDto.isEnable());
        dbUser.setUpdatedTime(LocalDateTime.now());
        User updatadedUser = userRepository.save(dbUser);

        return modelMapper.map(updatadedUser,UserDTO.class);
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
    public UserDTO getUserById(String userId) {
        UUID uid = UUID.fromString(userId);
        User user = userRepository.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found With Given Id"));

        return modelMapper.map(user,UserDTO.class);
    }

    @Override
    public CodeSnippestResponse saveUserCode(CodeSnippestDto codeSnippestDto){

        // Fetch user
        User user = userRepository.findById(codeSnippestDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        //Create snippet
        CodeSnippest snippest=new CodeSnippest();
        snippest.setName(codeSnippestDto.getName());
        snippest.setDescription(codeSnippestDto.getDescription());
        snippest.setLanguage(codeSnippestDto.getLanguage());
        snippest.setUser(user);

        //Map code files
        List<Code> codes=new ArrayList<>();

        for(CodeDto codeDto: codeSnippestDto.getCodeFiles()){
            Code code=new Code();
            code.setName(codeDto.getName());
            code.setContent(codeDto.getContent());
            code.setExtension(codeDto.getExtension());

            code.setCodeSnippest(snippest);
            codes.add(code);
        }

        snippest.setCodeFiles(codes);

        CodeSnippest save = codeSnippestRepository.save(snippest);

        CodeSnippestResponse codeSnippestResponse=new CodeSnippestResponse();

        codeSnippestResponse.setId(save.getId());
        codeSnippestResponse.setName(save.getName());
        codeSnippestResponse.setDescription(save.getDescription());
        codeSnippestResponse.setLanguage(save.getLanguage());

        List<CodeDto> codeDtos = save.getCodeFiles()
                .stream()
                .map(code -> {
                    CodeDto dto = new CodeDto();
                    dto.setName(code.getName());
                    dto.setContent(code.getContent());
                    dto.setExtension(code.getExtension());
                    return dto;
                })
                .toList();

        codeSnippestResponse.setCodeFiles(codeDtos);

        return codeSnippestResponse;
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
