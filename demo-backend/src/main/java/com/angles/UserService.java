package com.angles;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;
@Service
public class UserService {
    public final UserRepository repository;
    private final UserDTOMapper userDTOMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository,UserDTOMapper userDTOMapper,PasswordEncoder passwordEncoder){
        this.repository=repository;
        this.passwordEncoder=passwordEncoder;
        this.userDTOMapper=userDTOMapper;
    }
    public List<UserDTO> findUsers(){
        return repository.findAll()
            .stream()
            .map(userDTOMapper)
            .toList();
    }
    public User register(User user) {

        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        return repository.save(user);
    }

}
