package com.angles.album;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/albums")
public class AlbumController {
    private final AlbumService service;
    public AlbumController(AlbumService service){
        this.service=service;
    }
    @GetMapping
    public Page<AlbumResponse> getAlbums(Pageable pageable){
        return service.findAll(pageable);
    }
    @GetMapping("/search")
    public Page<AlbumResponse> search(@RequestParam String query,Pageable pageable){
        return service.search(query,pageable);
    }
    @GetMapping("/{id}")
    public AlbumResponse getAlbum(@PathVariable int id) {
        return service.findById(id);
    }
}
