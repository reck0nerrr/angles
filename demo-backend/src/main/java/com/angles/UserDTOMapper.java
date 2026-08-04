package com.angles;
import java.util.function.*;

import org.springframework.stereotype.Service;;
@Service
public class UserDTOMapper implements Function<User,UserDTO> {
    @Override
    public UserDTO apply(User user){
        return new UserDTO(
                user.getId(), 
                user.getEmail(), 
                user.getUsername(),
                user.getCreatedAt()
            );
    }
}
