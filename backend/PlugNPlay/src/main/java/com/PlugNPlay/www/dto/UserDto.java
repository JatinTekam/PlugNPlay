package com.PlugNPlay.www.dto;
import com.PlugNPlay.www.entity.CodeSnippest;
import com.PlugNPlay.www.entity.Provider;
import com.PlugNPlay.www.entity.Role;
import lombok.*;
import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private boolean enable=false;
    private List<CodeSnippest> codeSnippests=new ArrayList<>();
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Provider provider=Provider.LOCAL;
    private Set<RoleDto> roles=new HashSet<>();
}
