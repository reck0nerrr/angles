package com.angles.rating;

import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.angles.album.Album;
import com.angles.album.AlbumRepository;
import com.angles.track.Track;
import com.angles.track.TrackRepository;
import com.angles.user.User;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;
    private final AlbumRepository albumRepository;
    private final TrackRepository trackRepository;
    public Rating rate(User user, RatingRequest request){
        boolean hasAlbum = request.albumId() != null;
        boolean hasTrack = request.trackId() !=null;
        if(hasAlbum==hasTrack){
            throw new IllegalArgumentException("provide either album or track");
        }
        Rating rating;
        if(hasAlbum){
            System.out.println("albumId = " + request.albumId());
            Album album = albumRepository.findById(request.albumId())
                .orElseThrow(() -> new IllegalArgumentException("Album not found: " + request.albumId()));
            rating = ratingRepository.findByUser_IdAndAlbum_id(user.getId(), album.getId())
                .orElseGet(Rating::new);
            rating.setAlbum(album);
            rating.setTrack(null);
        }else{
            Track track = trackRepository.findById(request.trackId())
                .orElseThrow(()->new IllegalArgumentException("Track not found:"+request.trackId()));
            rating = ratingRepository.findByUser_IdAndTrackId(user.getId(), track.getId())
                .orElseGet(Rating::new);
            rating.setTrack(track);
            rating.setAlbum(null);

        }
        rating.setUser(user);
        rating.setRate(request.rate());
        rating.setComment(request.comment());
        rating.setUpdatedAt(Instant.now());
        return ratingRepository.save(rating);
    }
}
