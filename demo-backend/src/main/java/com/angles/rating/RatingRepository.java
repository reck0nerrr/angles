package com.angles.rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Optional<Rating> findByUser_IdAndAlbum_id(int userId, int albumId);
    Optional<Rating> findByUser_IdAndTrackId(int userId, int trackId);
    List<Rating> findByUser_IdAndTrack_IdIn(int userId, List<Integer> trackIds);
}
