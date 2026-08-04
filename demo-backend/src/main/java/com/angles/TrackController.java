package com.angles;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TrackController {
    private final TrackService service;
    public TrackController(TrackService service){
        this.service=service;
    }
    @GetMapping("/tracks")
    public List<Track> getTracks(){
        return service.findTracks();
    }
    
}
