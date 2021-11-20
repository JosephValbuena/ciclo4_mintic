package com.mintic.ciclo4r1.controllers;

import com.mintic.ciclo4r1.services.UserService;
import com.mintic.ciclo4r1.models.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author josva
 */

@RestController
@RequestMapping("/api/user/")
@CrossOrigin("")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("all")
    public List<User> getAll(){
        return userService.getAll();
    }
    
    @PostMapping("new")
    public User postUser(@RequestBody User user){
        return userService.postUser(user);
    }
    
    @GetMapping("/{email}")
    public boolean findByEmail(@PathVariable String email){
        return userService.findEmail(email);
    }
    
    @GetMapping("/{email}/{password}")
    public User findByEmail(@PathVariable String email, @PathVariable String password){
        return userService.authUser(email, password);
    }
}
