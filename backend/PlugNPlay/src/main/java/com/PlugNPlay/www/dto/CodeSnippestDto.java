package com.PlugNPlay.www.dto;

import com.PlugNPlay.www.entity.Code;
import com.PlugNPlay.www.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CodeSnippestDto {

    private UUID id;
    private String description;
    private String language;
    private String name;
    private UUID userId;
    private List<CodeDto> codeFiles=new ArrayList<>();

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<CodeDto> getCodeFiles() {
        return codeFiles;
    }

    public void setCodeFiles(List<CodeDto> codeFiles) {
        this.codeFiles = codeFiles;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }




}
