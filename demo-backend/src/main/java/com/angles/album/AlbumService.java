package com.angles.album;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.angles.exception.AlbumNotFoundException;
import com.angles.rating.RatingStat;
import com.angles.rating.RatingStatsService;
import com.angles.track.Track;
import com.angles.track.TrackResponse;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository repository;
    private final RatingStatsService ratingStatsService;

    public Page<AlbumResponse> findAll(Pageable pageable){
        return mapPage(repository.findAll(pageable)) ;
    }
    public AlbumResponse findById(int id){
        Album album = repository.findById(id)
            .orElseThrow(() -> new AlbumNotFoundException("Album not found"));
        List<Integer> trackIds = trackIdsOf(album);
        Map<Integer, RatingStat> albumStats = ratingStatsService.getAlbumStats(List.of(id));
        Map<Integer, RatingStat> trackStats = ratingStatsService.getTrackStats(trackIds);
        return toResponse(album, albumStats, trackStats);
    }
    public Page<AlbumResponse> search(String query,Pageable pageable){
        return mapPage(repository.search(query,pageable));
    }
    public Page<AlbumResponse> mapPage(Page<Album> page){
        List<Album> albums = page.getContent();
        List<Integer> albumIds = albums.stream().map(a->a.getId()).toList();
        List<Integer> trackIds = albums.stream()
            .flatMap(a -> trackIdsOf(a).stream())
            .toList();
        Map<Integer, RatingStat> albumStats = ratingStatsService.getAlbumStats(albumIds);
        Map<Integer, RatingStat> trackStats = ratingStatsService.getTrackStats(trackIds);

        List<AlbumResponse> responses = albums.stream()
            .map(a -> toResponse(a, albumStats, trackStats))
            .toList();

        return new PageImpl<>(responses, page.getPageable(), page.getTotalElements());
    }
    private AlbumResponse toResponse(Album album, Map<Integer, RatingStat> albumStats, Map<Integer, RatingStat> trackStats) {
        RatingStat albumStat = albumStats.get(album.getId());
        List<TrackResponse> trackResponses = (album.getTracks() != null ? album.getTracks() : List.<Track>of())
            .stream()
            .map(t -> {
                RatingStat ts = trackStats.get(t.getId());
                return new TrackResponse(
                    t.getId(), 
                    t.getTrackName(), 
                    t.getGenre(), 
                    t.getDuration(),
                    round(ts != null ? ts.average() : null),
                    ts != null ? ts.count() : 0
                );
            })
            .toList();

        return new AlbumResponse(
            album.getId(), album.getAlbumName(), album.getArtist(), album.getGenre(), album.getReleaseDate(), album.getCoverUrl(),
            round(albumStat != null ? albumStat.average() : null),
            albumStat != null ? albumStat.count() : 0,
            trackResponses
        );
    }

    private List<Integer> trackIdsOf(Album album) {
        return (album.getTracks() != null ? album.getTracks() : List.<Track>of())
            .stream().map(t->t.getId()).toList();
    }

    private Double round(Double value) {
        return value == null ? null : Math.round(value * 10.0) / 10.0;
    }
}
