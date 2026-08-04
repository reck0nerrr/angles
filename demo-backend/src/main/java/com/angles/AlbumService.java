package com.angles;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class AlbumService {
    private final AlbumRepository repository;

    public AlbumService(AlbumRepository repository){
        this.repository=repository;
    }
    public List<Album> findAll(){
        return repository.findAll();
    }
    public Optional<Album> findById(int id){
        return repository.findById(id);
    }
    public List<Album> search(String query){
        return repository.search(query);
    }

}
