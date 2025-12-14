package com.PlugNPlay.www.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeSnippest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String code;
    private String extension;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
