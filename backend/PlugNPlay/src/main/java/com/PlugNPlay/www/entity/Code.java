package com.PlugNPlay.www.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Code {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String content;
    private String extension;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="snippet_id")
    private CodeSnippest codeSnippest;

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

    public CodeSnippest getCodeSnippest() {
        return codeSnippest;
    }

    public void setCodeSnippest(CodeSnippest codeSnippest) {
        this.codeSnippest = codeSnippest;
    }
}
