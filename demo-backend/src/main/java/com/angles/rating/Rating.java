package com.angles.rating;

import java.time.Instant;

import com.angles.album.Album;
import com.angles.track.Track;
import com.angles.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ratings",uniqueConstraints = {
    @UniqueConstraint(name = "uq_user_album", columnNames = {"user_id", "album_id"}),
    @UniqueConstraint(name = "uq_user_track", columnNames = {"user_id", "track_id"})
}
)
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(optional = false)
    @JoinColumn(name="user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name="album_id")
    private Album album;
    @ManyToOne
    @JoinColumn(name="track_id")
    private Track track;
    @Min(1) @Max(10)
    private int rate;
    private String comment;
    @Column(name = "created_at", insertable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;
    
    public int getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Album getAlbum() { return album; }
    public void setAlbum(Album album) { this.album = album; }
    public Track getTrack() { return track; }
    public void setTrack(Track track) { this.track = track; }
    public int getRate() { return rate; }
    public void setRate(int rate) { this.rate = rate; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

}
