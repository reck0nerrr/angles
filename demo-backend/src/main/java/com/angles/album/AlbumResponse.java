package com.angles.album;

import com.angles.track.TrackResponse;
import java.time.LocalDate;
import java.util.List;

public record AlbumResponse(
    int id,
    String albumName,
    String artist,
    String genre,
    LocalDate releaseDate,
    String coverUrl,
    Double averageRating,
    long ratingCount,
    List<TrackResponse> tracks
) {}
