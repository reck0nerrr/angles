package com.angles.track;

import com.angles.album.Album;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
@Entity
@jakarta.persistence.Table(name = "tracks")
public class Track {
    @Id
    private int id;
    private String trackName;
    private int duration;
    private String genre;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;
    public Track(){

    }
    public Track(int id, Album album, String trackName, String genre, int duration){
        this.trackName=trackName;
        this.album=album;
        this.duration=duration;
        this.genre=genre;
        this.id=id;
    }
    public int getId(){
        return id;
    }
    public String getTrackName(){
        return trackName;
    }
    public Album getAlbum(){
        return album;
    }
    public String getGenre(){
        return genre;
    }
    public int getDuration(){
        return duration;
    }
    public String getIdAndtrackName(){
        return id+". "+"track name: "+trackName;
    }
    @Override
    public String toString(){
        return id+". "+"track name: "+trackName+", genre: "+genre;
    }
}
