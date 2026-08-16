package com.angles.rating;

import java.util.Map;

public record AlbumRatingsResponse(
    RatingResponse albumRating,
    Map<Integer, RatingResponse> trackRatings
) {
    
}
