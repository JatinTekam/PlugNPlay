package com.PlugNPlay.www.controller;

import com.PlugNPlay.www.dto.CodeSnippestRequest;
import com.PlugNPlay.www.dto.CodeSnippestResponse;
import com.PlugNPlay.www.service.CodeSnippestInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
public class SnippestController {

    private final CodeSnippestInterface codeSnippest;

    public SnippestController(CodeSnippestInterface codeSnippest) {
        this.codeSnippest = codeSnippest;
    }

    @PostMapping("/code")
    public ResponseEntity<CodeSnippestResponse> saveCode(@RequestBody CodeSnippestRequest codeSnippestRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(codeSnippest.saveUserCode(codeSnippestRequest));
    }

    @GetMapping("/snippest/{id}")
    public ResponseEntity<CodeSnippestResponse> getSnippest(@PathVariable String id){
        UUID snipId=UUID.fromString(id);
        return ResponseEntity.ok(codeSnippest.getSnippestById(snipId));
    }

    @GetMapping("/snippest")
    public ResponseEntity<List<CodeSnippestResponse>> getAllCodeSnippest(){
        return ResponseEntity.ok(codeSnippest.getAllDtos());
    }
}
