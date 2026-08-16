package com.angles.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/demo-ctrl")
public class DemoController {
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Secured Endpoint hello");
    }
    
    
}