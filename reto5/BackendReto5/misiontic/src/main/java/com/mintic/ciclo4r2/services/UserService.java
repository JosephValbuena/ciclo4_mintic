package com.mintic.ciclo4r2.services;

import com.mintic.ciclo4r2.repositories.UserRepository;
import com.mintic.ciclo4r2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author josva
 */

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;
    
    public List<User> getAll(){
        return userRepository.getAll();
    }
    
    public Optional<User> getUser(int id) {
        return userRepository.getUser(id);
    }
    
    public boolean findEmail(String email){
        Optional<User> user = userRepository.findEmail(email);
        
        return !user.isEmpty();
    }
    
    public User authUser(String email, String password){
        Optional<User> user = userRepository.authUser(email);
        
        if(user.isEmpty() || !user.get().getPassword().equals(password)){
            User userT = new User();
            userT.setId(null);
            userT.setIdentification(null);
            userT.setName(null);
            userT.setAddress(null);
            userT.setCellPhone(null);
            userT.setEmail(null);
            userT.setPassword(null);
            userT.setZone(null);
            userT.setType(null);
            return userT;
        }
        
        return user.get();
    }
    
    public User postUser(User user){
        return userRepository.save(user);
    }
    
    public User create(User user){
        Optional<User> userIdMaximo = userRepository.lastUserId();
        
        if(user.getId() == null){
            if(userIdMaximo.isEmpty())
                user.setId(1);
            
            else
                user.setId(userIdMaximo.get().getId()+1);
        }
        
        Optional<User> e = userRepository.getUser(user.getId());
        if (e.isEmpty()){
            if (userRepository.emailExists(user.getEmail())== false){
                return userRepository.save(user);
            }else {
                return user;
            }        
        }else {
            return user;
        }
        
    }
    
    public User updateUser(User user){
        return userRepository.save(user);
    }
    
    public void deleteUser(int id){
        userRepository.deleteUser(id);
    }
    
    public List<User> getUserByMonthBirthday(String month){
        return userRepository.getUserByMonthBirthday(month);
    }
    
}
