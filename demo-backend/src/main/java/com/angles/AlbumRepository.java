package com.angles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;
@Repository
public interface AlbumRepository extends JpaRepository<Album, Integer>{
    @Query("""
        SELECT DISTINCT a
        FROM Album a
        LEFT JOIN a.tracks t
        WHERE LOWER(a.albumName) LIKE LOWER(CONCAT('%', :query, '%'))
        OR LOWER(a.artist) LIKE LOWER(CONCAT('%', :query, '%'))
        OR LOWER(a.genre) LIKE LOWER(CONCAT('%', :query, '%'))
        OR LOWER(t.trackName) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    Page<Album> search(@Param("query") String query,Pageable pageable);
}