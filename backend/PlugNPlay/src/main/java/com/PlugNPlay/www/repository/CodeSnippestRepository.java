package com.PlugNPlay.www.repository;

import com.PlugNPlay.www.entity.CodeSnippest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CodeSnippestRepository extends JpaRepository<CodeSnippest, UUID> {
}
