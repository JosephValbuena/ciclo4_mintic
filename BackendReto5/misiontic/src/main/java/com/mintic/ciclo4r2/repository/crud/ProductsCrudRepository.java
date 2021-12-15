/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.repository.crud;

import com.mintic.ciclo4r2.model.Products;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author JehisonGalarza
 */
public interface ProductsCrudRepository extends MongoRepository<Products, Integer>{
    List<Products> findByDescriptionLike(String description);
    List<Products> findByPrice(Integer price);
}