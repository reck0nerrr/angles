package com.angles.rating;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angles.user.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/ratings")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService service;
    @PostMapping()
    public ResponseEntity<RatingResponse> rate(@AuthenticationPrincipal User user, @Valid @RequestBody RatingRequest request) {
        Rating saved = service.rate(user, request);
        return ResponseEntity.ok(RatingResponse.from(saved));
    }
    
}
