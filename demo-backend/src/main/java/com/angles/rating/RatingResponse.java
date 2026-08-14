package com.angles.rating;

import java.time.LocalDateTime;

public record RatingResponse(
    int id,
    int userId,
    String username,
    Integer albumId,
    Integer trackId,
    int rate,
    String comment,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static RatingResponse from(Rating rating){
        return new RatingResponse(
            rating.getId(),
            rating.getUser().getId(), 
            rating.getUser().getDisplayUsername(), 
            rating.getAlbum() != null ? rating.getAlbum().getId() : null, 
            rating.getTrack() != null ? rating.getTrack().getId() : null, 
            rating.getRate(),
            rating.getComment(),
            rating.getCreatedAt(),
            rating.getUpdatedAt()
        );
    }
}
