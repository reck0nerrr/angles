package com.angles;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")

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
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return service.register(user);
    }
    
}
