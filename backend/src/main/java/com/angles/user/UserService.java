package com.angles.user;

import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UserService {
    public final UserRepository repository;
    private final UserDTOMapper userDTOMapper;

    public UserService(UserRepository repository,UserDTOMapper userDTOMapper){
        this.repository=repository;
        this.userDTOMapper=userDTOMapper;
    }
    public List<UserDTO> findUsers(){
        return repository.findAll()
            .stream()
            .map(userDTOMapper)
            .toList();
    }


}
