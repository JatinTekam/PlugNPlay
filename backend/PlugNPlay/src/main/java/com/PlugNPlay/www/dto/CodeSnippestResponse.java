package com.PlugNPlay.www.dto;


import com.PlugNPlay.www.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CodeSnippestResponse {

    private UUID id;
    private String description;
    private String language;
    private String name;

    private User user;

    private List<CodeDto> codeFiles=new ArrayList<>();

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CodeDto> getCodeFiles() {
        return codeFiles;
    }

    public void setCodeFiles(List<CodeDto> codeFiles) {
        this.codeFiles = codeFiles;
    }
}
