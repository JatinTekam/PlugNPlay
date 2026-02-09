package com.PlugNPlay.www.service;


//This Class Contains All Code Snippet Related Logic

import com.PlugNPlay.www.dto.CodeSnippestRequest;
import com.PlugNPlay.www.dto.CodeSnippestResponse;


import java.util.List;
import java.util.UUID;

public interface CodeSnippestInterface {


    List<CodeSnippestResponse> getAllDtos();

    CodeSnippestResponse saveUserCode(CodeSnippestRequest codeSnippestRequest);

    CodeSnippestResponse getSnippestById(UUID id);
}
