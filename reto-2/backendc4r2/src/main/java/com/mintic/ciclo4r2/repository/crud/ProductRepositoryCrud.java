package com.mintic.ciclo4r2.repository.crud;

import com.mintic.ciclo4r2.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author josva
 */
public interface ProductRepositoryCrud extends MongoRepository<Product, Integer>{
    
}
