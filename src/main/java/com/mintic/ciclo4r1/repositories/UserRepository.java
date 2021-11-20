package com.mintic.ciclo4r1.repositories;

import com.mintic.ciclo4r1.models.User;
import com.mintic.ciclo4r1.repository.crud.UserCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author josva
 */

@Repository
public class UserRepository {
    
    @Autowired
    private UserCrudRepository userCrudRepository;
    
    public List<User> getAll(){
        return (List<User>) userCrudRepository.findAll();
    }
    
    public Optional<User> findEmail(String email){
        return userCrudRepository.findByEmail(email);
    }
    
    public Optional<User> authUser(String email){
        return userCrudRepository.findByEmail(email);
    }
    
    public User save(User user){
        return userCrudRepository.save(user);
    }
    
    
}
