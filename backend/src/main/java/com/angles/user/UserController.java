package com.angles.user;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.GetMapping;
import java.util.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.validation.annotation.Validated;
@Validated
@RestController
@RequestMapping("/users")
public class UserController {
    public final UserService service;
    public UserController(UserService service){
        this.service=service;
    }
    @GetMapping
    public List<UserDTO> getUsers(){
        return service.findUsers();
    }
    
}
