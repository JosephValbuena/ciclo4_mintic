package com.mintic.ciclo4r2.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mintic.ciclo4r2.model.User;
import java.util.Optional;

/**
 *
 * @author josva
 */
public interface UserRepositoryCrud extends MongoRepository<User, Integer>{
    Optional<User> findByEmail(String email);
}
