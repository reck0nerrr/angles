package com.angles.user;
import java.time.Instant;
public record UserDTO(
    Integer id,
    String email,
    String username,
    Instant created_at
) {

}
