package com.angles.user;

import java.time.Instant;
import java.util.*;

import org.hibernate.annotations.Generated;
import org.hibernate.generator.EventType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "users")
@NoArgsConstructor
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    @Column(name = "created_at", insertable = false, updatable = false)
    @Generated(event = EventType.INSERT)
    private Instant createdAt;
    @Enumerated(EnumType.STRING)
    private com.angles.user.Role role;

    @Builder
    public User(
        String username,
        String email,
        String passwordHash,
        Role role
    ) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }


    public int getId(){
        return id;
    }
    @Override
    public String getUsername(){
        return email;
    }

    public void setUsername(String username){
        this.username = username;
    }
    public String getDisplayUsername(){
        return username;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPasswordHash(){
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash){
        this.passwordHash = passwordHash;
    }
    public Instant getCreatedAt(){
        return createdAt;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public boolean isAccountNonExpired() {
        return true; // true = учетная запись не просрочена
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // true = учетная запись не заблокирована
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // true = пароль/токен пользователя действителен
    }

    @Override
    public boolean isEnabled() {
        return true; // true = учетная запись активна
    }
    @Override
    public String getPassword(){
        return passwordHash;
    }

}