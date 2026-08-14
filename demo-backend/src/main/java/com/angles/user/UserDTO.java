package com.angles.user;
import java.time.LocalDateTime;
public record UserDTO(
    Integer id,
    String email,
    String username,
    LocalDateTime created_at
) {

}
