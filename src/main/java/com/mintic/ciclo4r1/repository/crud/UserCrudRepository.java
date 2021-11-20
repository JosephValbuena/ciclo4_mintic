package com.mintic.ciclo4r1.repository.crud;

import com.mintic.ciclo4r1.models.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
/**
 *
 * @author josva
 */
public interface UserCrudRepository extends CrudRepository<User, Integer> {
    
    Optional<User> findByEmail(String email);
//    @Query ("SELECT * FROM User as usu WHERE usu.email = ")
//    Optional<User> findByCaros();
}
