package com.PlugNPlay.www.serviceImpl;

import com.PlugNPlay.www.dto.CodeDto;
import com.PlugNPlay.www.dto.CodeSnippestDto;
import com.PlugNPlay.www.dto.CodeSnippestResponse;
import com.PlugNPlay.www.entity.Code;
import com.PlugNPlay.www.entity.CodeSnippest;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.exceptions.ResourceNotFoundException;
import com.PlugNPlay.www.repository.CodeSnippestRepository;
import com.PlugNPlay.www.repository.UserRepository;
import com.PlugNPlay.www.service.CodeSnippestInterface;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CodeSnippestImpl implements CodeSnippestInterface {

    private final CodeSnippestRepository codeSnippestRepository;
    private final UserRepository userRepository;

    public CodeSnippestImpl(CodeSnippestRepository codeSnippestRepository, UserRepository userRepository) {
        this.codeSnippestRepository = codeSnippestRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<CodeSnippestResponse> getAllDtos() {
        List<CodeSnippestResponse> listOfCodeSnippestResponses=new ArrayList<>();
        for(CodeSnippest snippest:codeSnippestRepository.findAll()){
            CodeSnippestResponse codeSnippestResponse=new CodeSnippestResponse();
            codeSnippestResponse.setId(snippest.getId());
            codeSnippestResponse.setDescription(snippest.getDescription());
            codeSnippestResponse.setLanguage(snippest.getLanguage());
            codeSnippestResponse.setName(snippest.getName());
            codeSnippestResponse.setUsername(snippest.getUsername());
            //codeSnippestResponse.setUser(snippest.getUser());
            codeSnippestResponse.setCreatedAt(snippest.getCreatedAt());
            List<CodeDto> codeDtos = mapSnippestToCodeDto(snippest);
            codeSnippestResponse.setCodeFiles(codeDtos);
            listOfCodeSnippestResponses.add(codeSnippestResponse);
        }
        return listOfCodeSnippestResponses;
    }

    @Override
    public CodeSnippestResponse saveUserCode(CodeSnippestDto codeSnippestDto){

        // Fetch user From SecurityContextHolder
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();


        //Create snippet
        CodeSnippest snippest=new CodeSnippest();
        snippest.setName(codeSnippestDto.getName());
        snippest.setDescription(codeSnippestDto.getDescription());
        snippest.setLanguage(codeSnippestDto.getLanguage());
        snippest.setUser(user);
        snippest.setUsername(user.getName());

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
        codeSnippestResponse.setUsername(save.getUsername());
        codeSnippestResponse.setCreatedAt(save.getCreatedAt());


        List<CodeDto> codeDtos = mapSnippestToCodeDto(save);
        codeSnippestResponse.setCodeFiles(codeDtos);
        return codeSnippestResponse;
    }

    @Override
    public CodeSnippestResponse getSnippestById(UUID id) throws ResourceNotFoundException{
        Optional<CodeSnippest> snippestById = codeSnippestRepository.findById(id);

        if(snippestById.isPresent()){
            CodeSnippest snippest = snippestById.get();
            CodeSnippestResponse codeSnippestResponse=new CodeSnippestResponse();
            codeSnippestResponse.setId(snippest.getId());
            codeSnippestResponse.setDescription(snippest.getDescription());
            codeSnippestResponse.setLanguage(snippest.getLanguage());
            codeSnippestResponse.setName(snippest.getName());
            //codeSnippestResponse.setUser(snippest.getUser());
            codeSnippestResponse.setUsername(snippest.getUsername());
            codeSnippestResponse.setCreatedAt(snippest.getCreatedAt());

            List<CodeDto> codeDtos = mapSnippestToCodeDto(snippest);
            codeSnippestResponse.setCodeFiles(codeDtos);
            return codeSnippestResponse;
        }

        throw  new ResourceNotFoundException("Id Not Found");

    }


    private CodeSnippestDto mapToDto(CodeSnippest entity) {
        CodeSnippestDto dto = new CodeSnippestDto();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setLanguage(entity.getLanguage());
        dto.setUserId(entity.getUser().getId());

        dto.setCodeFiles(
                entity.getCodeFiles()
                        .stream()
                        .map(code -> new CodeDto(
                                code.getId(),
                                code.getName(),
                                code.getContent(),
                                code.getExtension()
                        ))
                        .toList()
        );

        return dto;
    }

    public List<CodeDto> mapSnippestToCodeDto(CodeSnippest snippest){

       return snippest.getCodeFiles()
                .stream()
                .map(code -> {
                    CodeDto dto = new CodeDto();
                    dto.setId(code.getId());
                    dto.setName(code.getName());
                    dto.setContent(code.getContent());
                    dto.setExtension(code.getExtension());
                    return dto;
                })
                .toList();
    }
}
