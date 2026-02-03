package com.PlugNPlay.www.serviceImpl;

import com.PlugNPlay.www.dto.CodeDto;
import com.PlugNPlay.www.dto.CodeSnippestDto;
import com.PlugNPlay.www.entity.CodeSnippest;
import com.PlugNPlay.www.repository.CodeSnippestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeSnippestImpl {

    private final CodeSnippestRepository codeSnippestRepository;

    public CodeSnippestImpl(CodeSnippestRepository codeSnippestRepository) {
        this.codeSnippestRepository = codeSnippestRepository;
    }

    public List<CodeSnippestDto> getAllDtos() {
        return codeSnippestRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
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
}
