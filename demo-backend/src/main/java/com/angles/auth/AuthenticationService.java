package com.angles.auth;

import org.springframework.stereotype.Service;

import com.angles.user.RegisterRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    public AuthenticationResponce register(RegisterRequest request){
        return null;
    }
    public AuthenticationResponce authenticate(AuthenticationRequest request){
        return null;
    }
}
