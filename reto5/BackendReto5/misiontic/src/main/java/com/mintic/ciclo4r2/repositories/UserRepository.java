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
    
    /**
     * Crud de repositorio
     */
    @Autowired
    private UserRepositoryCrud userRepositoryCrud;
    
    /**
     * 
     * @return 
     */
    public List<User> getAll(){
        return (List<User>) userRepositoryCrud.findAll();
    }
    
    
    /**
     * 
     * @param id
     * @return 
     */
    public Optional<User> getUser(int id) {
        return userRepositoryCrud.findById(id);
    }
    
    /**
     * 
     * @param user
     * @return 
     */
    public User save(User user){
        return userRepositoryCrud.save(user);
    }
    
    /**
     * 
     * @param user 
     */
    public void update(User user) {
        userRepositoryCrud.save(user);
    }
    
    
    /**
     * 
     * @param id 
     */
    public void deleteUser(int idUser){
        userRepositoryCrud.deleteById(idUser);
    }
    
    
    /**
     * 
     * @param email
     * @return 
     */
    public boolean emailExists(String email) {
        Optional<User> usuario = userRepositoryCrud.findByEmail(email);
        
        return !usuario.isEmpty();
    }
    
    
    /**
     * 
     * @param email
     * @param password
     * @return 
     */
    public Optional<User> authenticateUser(String email, String password){
        return userRepositoryCrud.findByEmailAndPassword(email, password);
    }
    
    /**
     * 
     * @return 
     */
    public Optional<User> lastUserId(){
        return userRepositoryCrud.findTopByOrderByIdDesc();
    }
    
    /**
     * 
     * @param email
     * @return 
     */
    public Optional<User> findEmail(String email){
        return userRepositoryCrud.findByEmail(email);
    }
    
    /**
     * 
     * @param email
     * @return 
     */
    public Optional<User> authUser(String email){
        return userRepositoryCrud.findByEmail(email);
    }
    
    /**
     * 
     * @param month
     * @return 
     */
    public List<User> getUserByMonthBirthday(String month){
        return userRepositoryCrud.findByMonthBirthtDay(month);
    }
}
