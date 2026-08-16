package com.angles.track;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.*;
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
