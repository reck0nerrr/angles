package com.angles.rating;

public record RatingStat(
    Integer targetId,
    Double average,
    Long count
) {
    
}
