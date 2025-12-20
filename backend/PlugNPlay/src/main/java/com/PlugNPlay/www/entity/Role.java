package com.PlugNPlay.www.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
public class Role {

    @Id
    private UUID id=UUID.randomUUID();

    @Column(unique = true,nullable = false)
    private String name;

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
}
