package com.angles.rating;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class RatingStatsService {
    private final RatingRepository repository;

    public RatingStatsService(RatingRepository repository){
        this.repository = repository;
    }

    public Map<Integer, RatingStat> getAlbumStats(List<Integer> albumIds){
        if (albumIds.isEmpty()) return Map.of();
        return toMap(repository.findAlbumRatingStats(albumIds));
    }

    public Map<Integer, RatingStat> getTrackStats(List<Integer> trackIds){
        if (trackIds.isEmpty()) return Map.of();
        return toMap(repository.findTrackRatingStats(trackIds));
    }

    private Map<Integer, RatingStat> toMap(List<RatingStat> stats){
        return stats.stream().collect(Collectors.toMap(rs->rs.targetId(), Function.identity()));
    }
}