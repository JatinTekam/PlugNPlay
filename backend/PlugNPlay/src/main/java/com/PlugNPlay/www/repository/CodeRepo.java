package com.PlugNPlay.www.repository;

import com.PlugNPlay.www.dto.CodeDto;
import com.PlugNPlay.www.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CodeRepo extends JpaRepository<Code, UUID> {


   // List<CodeDto> findById(UUID id);
}
