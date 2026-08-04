package com.angles;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    private LocalDate date;
    private String genre;
    private int rate;
    @JsonManagedReference
    @OneToMany(mappedBy = "album")
    private List<Track> tracks;
    public Album() {
        
    }
    public Album(int id, String albumName,String artist,String genre,LocalDate date,int rate,List<Track> tracks){
        this.id=id;
        this.albumName=albumName;
        this.artist=artist;
        this.date=date;
        this.genre=genre;
        this.rate=rate;
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
    public LocalDate getDate(){
        return date;
    }
    public String getGenre(){
        return genre;
    }
    public List<Track> getTracks(){
        return tracks;
    }
    public int getRate(){
        return rate;
    }
    public void addTrack(Track track){
        tracks.add(track);
    }
    @Override
    public String toString(){
        return id+". "+"album name: "+albumName+", artist: "+artist+", genre: "+genre+", release date: "+date+", rate: "+rate+", tracklist: "+tracks;
    }
}
