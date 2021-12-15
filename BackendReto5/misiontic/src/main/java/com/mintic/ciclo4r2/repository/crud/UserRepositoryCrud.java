package com.mintic.ciclo4r2.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mintic.ciclo4r2.model.User;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author josva
 */
public interface UserRepositoryCrud extends MongoRepository<User, Integer>{
    Optional<User> findByEmail(String email);
    
    Optional<User> findByEmailAndPassword(String email, String password);
    
    //Seleccionar el usuario con el id maximo o el último id.
    Optional<User> findTopByOrderByIdDesc();
    
    List<User> findByMonthBirthtDay(String month);
    
}
