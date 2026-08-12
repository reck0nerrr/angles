package com.angles.album;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.angles.exception.AlbumNotFoundException;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
@Service
public class AlbumService {
    private final AlbumRepository repository;

    public AlbumService(AlbumRepository repository){
        this.repository=repository;
    }
    public Page<Album> findAll(Pageable pageable){
        return repository.findAll(pageable);
    }
    public Album findById(int id){
        return repository.findById(id)
            .orElseThrow(() -> new AlbumNotFoundException("Album not found"));
    }
    public Page<Album> search(String query,Pageable pageable){
        return repository.search(query,pageable);
    }

}
