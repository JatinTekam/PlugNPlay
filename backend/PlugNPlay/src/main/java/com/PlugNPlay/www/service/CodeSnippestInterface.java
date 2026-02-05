package com.PlugNPlay.www.service;


//This Class Contains All Code Snippet Related Logic

import com.PlugNPlay.www.dto.CodeSnippestDto;
import com.PlugNPlay.www.dto.CodeSnippestResponse;


import java.util.List;
import java.util.UUID;

public interface CodeSnippestInterface {


    List<CodeSnippestResponse> getAllDtos();

    CodeSnippestResponse saveUserCode(CodeSnippestDto codeSnippestDto);

    CodeSnippestResponse getSnippestById(UUID id);
}
