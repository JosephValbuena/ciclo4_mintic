package com.mintic.ciclo4r1.services;

import com.mintic.ciclo4r1.repositories.UserRepository;
import com.mintic.ciclo4r1.models.User;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author josva
 */

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAll(){
        return userRepository.getAll();
    }
    
    public boolean findEmail(String email){
        Optional<User> user = userRepository.findEmail(email);
        
        return !user.isEmpty();
    }
    
    public User authUser(String email, String password){
        Optional<User> user = userRepository.authUser(email);
        
        if(user.isEmpty()){
            User userT = new User();
            userT.setId(null);
            userT.setEmail(email);
            userT.setPassword(password);
            userT.setName("NO DEFINIDO");
            return userT;
        }
        
        if(!user.get().getPassword().equals(password)){
            User userT = new User();
            userT.setId(null);
            userT.setEmail(email);
            userT.setPassword(password);
            userT.setName("NO DEFINIDO");
            return userT;
        }
        
        return user.get();
    }
    
    public Optional<User> getUser(String email){
        Optional<User> user = userRepository.authUser(email);
        
        if(user.isEmpty()){
            return user;
        }
        
        return user;
    }
    
    public User postUser(User user){
        return userRepository.save(user);
    }
}
