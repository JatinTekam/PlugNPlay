package com.PlugNPlay.www.dto;

import java.util.UUID;

public class CodeDto {

    private UUID id;
    private String name;
    private String content;
    private String extension;

    public CodeDto() {}

    public CodeDto(UUID id, String name, String content, String extension) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.extension = extension;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
