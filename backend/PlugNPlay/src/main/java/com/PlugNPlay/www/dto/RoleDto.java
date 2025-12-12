package com.PlugNPlay.www.dto;
import lombok.*;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleDto {
    private UUID id;
    private String name;
}
