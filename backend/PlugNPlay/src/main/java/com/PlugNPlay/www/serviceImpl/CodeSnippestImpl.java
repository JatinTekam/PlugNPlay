package com.PlugNPlay.www.serviceImpl;

import com.PlugNPlay.www.dto.CodeRequest;
import com.PlugNPlay.www.dto.CodeSnippestRequest;
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
            List<CodeRequest> codeRequests = mapSnippestToCodeDto(snippest);
            codeSnippestResponse.setCodeFiles(codeRequests);
            listOfCodeSnippestResponses.add(codeSnippestResponse);
        }
        return listOfCodeSnippestResponses;
    }

    @Override
    public CodeSnippestResponse saveUserCode(CodeSnippestRequest codeSnippestRequest){

        // Fetch user From SecurityContextHolder
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();


        //Create snippet
        CodeSnippest snippest=new CodeSnippest();
        snippest.setName(codeSnippestRequest.getName());
        snippest.setDescription(codeSnippestRequest.getDescription());
        snippest.setLanguage(codeSnippestRequest.getLanguage());
        snippest.setUser(user);
        snippest.setUsername(user.getName());

        //Map code files
        List<Code> codes=new ArrayList<>();

        for(CodeRequest codeRequest : codeSnippestRequest.getCodeFiles()){
            Code code=new Code();
            code.setName(codeRequest.getName());
            code.setContent(codeRequest.getContent());
            code.setExtension(codeRequest.getExtension());

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


        List<CodeRequest> codeRequests = mapSnippestToCodeDto(save);
        codeSnippestResponse.setCodeFiles(codeRequests);
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

            List<CodeRequest> codeRequests = mapSnippestToCodeDto(snippest);
            codeSnippestResponse.setCodeFiles(codeRequests);
            return codeSnippestResponse;
        }

        throw  new ResourceNotFoundException("Id Not Found");

    }


    private CodeSnippestRequest mapToDto(CodeSnippest entity) {
        CodeSnippestRequest dto = new CodeSnippestRequest();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setLanguage(entity.getLanguage());
        dto.setUserId(entity.getUser().getId());

        dto.setCodeFiles(
                entity.getCodeFiles()
                        .stream()
                        .map(code -> new CodeRequest(
                                code.getId(),
                                code.getName(),
                                code.getContent(),
                                code.getExtension()
                        ))
                        .toList()
        );

        return dto;
    }

    public List<CodeRequest> mapSnippestToCodeDto(CodeSnippest snippest){

       return snippest.getCodeFiles()
                .stream()
                .map(code -> {
                    CodeRequest dto = new CodeRequest();
                    dto.setId(code.getId());
                    dto.setName(code.getName());
                    dto.setContent(code.getContent());
                    dto.setExtension(code.getExtension());
                    return dto;
                })
                .toList();
    }
}
