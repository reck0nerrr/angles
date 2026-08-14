package com.angles.rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Optional<Rating> findByUser_IdAndAlbum_id(int userId, int albumId);
    Optional<Rating> findByUser_IdAndTrackId(int userId, int trackId);
    List<Rating> findByUser_IdAndTrack_IdIn(int userId, List<Integer> trackIds);
    @Query("""
        SELECT new com.angles.rating.RatingStat(r.track.id, AVG(r.rate), COUNT(r))
        FROM Rating r
        WHERE r.track.id IN :trackIds
        GROUP BY r.track.id
    """)
    List<RatingStat> findAlbumRatingStats(@Param("albumIds") List<Integer> albumIds);
    @Query("""
        SELECT new com.angles.rating.RatingStat(r.track.id, AVG(r.rate), COUNT(r))
        FROM Rating r
        WHERE r.track.id IN :trackIds
        GROUP BY r.track.id
    """)
    List<RatingStat> findTrackRatingStats(@Param("trackIds") List<Integer> trackIds);

}
