package com.PlugNPlay.www.dto;
import com.PlugNPlay.www.entity.CodeSnippest;
import com.PlugNPlay.www.enums.Provider;
import java.time.LocalDateTime;
import java.util.*;

public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private boolean enable=true;
    private List<CodeSnippest> codeSnippests=new ArrayList<>();
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Provider provider=Provider.LOCAL;
    private Set<RoleDto> roles=new HashSet<>();

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public List<CodeSnippest> getCodeSnippests() {
        return codeSnippests;
    }

    public void setCodeSnippests(List<CodeSnippest> codeSnippests) {
        this.codeSnippests = codeSnippests;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public Set<RoleDto> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDto> roles) {
        this.roles = roles;
    }
}
