package com.angles.user;

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
    public UserDTO register(RegisterRequest request) {
        System.out.println(request.password());
        User user=new User();
        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setPasswordHash(
            passwordEncoder.encode(request.password())
        );

        User saved = repository.save(user);
        return userDTOMapper.apply(saved);
    }

}
