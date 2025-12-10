package com.PlugNPlay.www.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @RequestMapping
    public String sayHello(){
        return "Hello User";
    }
}
