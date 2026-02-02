package com.PlugNPlay.www.repository;

import com.PlugNPlay.www.dto.CodeDto;
import com.PlugNPlay.www.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CodeRepo extends JpaRepository<Code, UUID> {

    @Query()
    CodeDto getCodeSnippestById(UUID id);
}
