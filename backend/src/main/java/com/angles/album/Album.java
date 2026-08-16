package com.angles.album;
import java.util.*;
import com.angles.track.Track;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.time.LocalDate;
@Entity
@jakarta.persistence.Table(name = "albums")
public class Album {
    @Id
    private int id;
    private String albumName;
    private String artist;
    private LocalDate releaseDate;
    private String genre;
    @Column(name = "cover_url")
    private String coverUrl;
    @JsonManagedReference
    @OneToMany(mappedBy = "album")
    private List<Track> tracks;
    public Album() {
        
    }
    public Album(int id, String albumName,String artist,String genre,LocalDate releaseDate,List<Track> tracks){
        this.id=id;
        this.albumName=albumName;
        this.artist=artist;
        this.releaseDate=releaseDate;
        this.genre=genre;
        this.tracks=tracks;
    }
    public int getId(){
        return id;
    }
    public String getAlbumName(){
        return albumName;
    }
    public String getArtist(){
        return artist;
    }
    public LocalDate getReleaseDate(){
        return releaseDate;
    }
    public String getGenre(){
        return genre;
    }
    public List<Track> getTracks(){
        return tracks;
    }
    public void addTrack(Track track){
        tracks.add(track);
    }
    public String getCoverUrl() {
        return coverUrl;
    }
    public void setCoverUrl(String coverUrl){
        this.coverUrl = coverUrl;
    }
    @Override
    public String toString(){
        return id+". "+"album name: "+albumName+", artist: "+artist+", genre: "+genre+", release date: "+releaseDate+", tracklist: "+tracks;
    }
}
