package com.mintic.ciclo4r2.repositories;

import com.mintic.ciclo4r2.repository.crud.UserRepositoryCrud;
import com.mintic.ciclo4r2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author josva
 */

@Repository
public class UserRepository {
    
    @Autowired
    private UserRepositoryCrud userRepositoryCrud;
    
    public List<User> getAll(){
        return (List<User>) userRepositoryCrud.findAll();
    }
    
    public Optional<User> findEmail(String email){
        return userRepositoryCrud.findByEmail(email);
    }
    
    public Optional<User> authUser(String email){
        return userRepositoryCrud.findByEmail(email);
    }
    
    public User save(User user){
        return userRepositoryCrud.save(user);
    }
    
    public void deleteUser(int id){
        userRepositoryCrud.deleteById(id);
    }
}
