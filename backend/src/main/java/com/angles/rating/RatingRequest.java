package com.angles.rating;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record RatingRequest(
    Integer albumId,
    Integer trackId,
    @Min(1) @Max(10) int rate,
    String comment
) {


}
