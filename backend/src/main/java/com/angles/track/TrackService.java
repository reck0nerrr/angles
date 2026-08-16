package com.angles.track;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TrackService {
    private final TrackRepository repository;
    public TrackService(TrackRepository repository){
        this.repository=repository;
    }
    public List<Track> findTracks(){
        return repository.findAll();
    }
}
