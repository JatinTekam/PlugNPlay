package com.PlugNPlay.www.entity;

import com.PlugNPlay.www.dto.CodeDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class CodeSnippest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String description;
    private String language;
    private String name;
    private String username;


    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;


    @OneToMany(mappedBy = "codeSnippest",
                cascade = CascadeType.ALL,
                orphanRemoval = true)
    private List<Code> codeFiles=new ArrayList<>();

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Code> getCodeFiles() {
        return codeFiles;
    }

    public void setCodeFiles(List<Code> codeFiles) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
