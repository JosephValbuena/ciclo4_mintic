package com.mintic.ciclo4r2.controller;

import com.mintic.ciclo4r2.services.UserService;
import com.mintic.ciclo4r2.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author josva
 */

@RestController
@RequestMapping("/api/user/")
@CrossOrigin("*")
public class UserController {
    
    /**
     * Variable de servicio
     */
    @Autowired
    private UserService userService;
    
    /**
     * 
     * @return usuarios
     */
    @GetMapping("all")
    public List<User> getAll(){
        return userService.getAll();
    }
    
    
    @GetMapping("{id}")
    public Optional<User> getUser(@PathVariable("id") int id) {
        return userService.getUser(id);
    }
    
    /**
     * 
     * @param user
     * @return 
     */
    @PostMapping("new")
    @ResponseStatus(HttpStatus.CREATED)
    public User postUser(@RequestBody User user){
        return userService.postUser(user);
    }
    
    /**
     * 
     * @param email
     * @return 
     */
    @GetMapping("emailexist/{email}")
    public boolean findByEmail(@PathVariable String email){
        return userService.findEmail(email);
    }
    
    /**
     * 
     * @param email
     * @param password
     * @return 
     */
    @GetMapping("/{email}/{password}")
    public User findByEmail(@PathVariable String email, @PathVariable String password){
        return userService.authUser(email, password);
    }
    
    /**
     * 
     * @param user
     * @return 
     */
    @PutMapping("update")
    @ResponseStatus(HttpStatus.CREATED)
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }
    
    /**
     * 
     * @param id 
     */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable int id){
        userService.deleteUser(id);
    }
    
    @GetMapping("birthday/{month}")
    public List<User> getUserByMonthBirthday(@PathVariable String month){
        return userService.getUserByMonthBirthday(month);
    }
}
