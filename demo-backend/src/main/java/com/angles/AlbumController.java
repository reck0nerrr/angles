package com.angles;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class AlbumController {
    private final AlbumService service;
    public AlbumController(AlbumService service){
        this.service=service;
    }
    @GetMapping("/albums")
    public List<Album> getAlbums(){
        return service.findAll();
    }
}
