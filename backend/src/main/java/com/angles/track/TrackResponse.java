package com.angles.track;

public record TrackResponse(
    int id,
    String trackName,
    String genre,
    int duration,
    Double averageRating,
    long ratingCount
) {}
