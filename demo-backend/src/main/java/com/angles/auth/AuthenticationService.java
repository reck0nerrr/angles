package com.angles.auth;

import com.angles.user.User;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.angles.user.JwtService;
import com.angles.user.RegisterRequest;
import com.angles.user.Role;
import com.angles.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponce register(RegisterRequest request){
        var user = User.builder()
            .username(request.username())
            .email(request.email())
            .passwordHash(passwordEncoder.encode(request.password()))
            .role(Role.USER)
            .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponce
            .builder()
            .token(jwtToken)
            .build();
    }
    public AuthenticationResponce authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        var user = repository.findByEmail(request.email())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponce
            .builder()
            .token(jwtToken)
            .build();
    }
}
