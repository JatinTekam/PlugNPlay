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
public class Role {

    @Id
    private UUID id=UUID.randomUUID();

    @Column(unique = true,nullable = false)
    private String name;
}
