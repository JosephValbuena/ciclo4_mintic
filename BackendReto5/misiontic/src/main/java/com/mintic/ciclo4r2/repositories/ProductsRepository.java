/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.repositories;

import com.mintic.ciclo4r2.model.Products;
import com.mintic.ciclo4r2.repository.crud.ProductsCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author JehisonGalarza
 */
@Repository
public class ProductsRepository {
    @Autowired
    private ProductsCrudRepository productsCrudRepository;
    
    public List<Products> getAll(){
        return (List<Products>) productsCrudRepository.findAll();
    }
    
    public Optional<Products> getProduct(int id){
        return productsCrudRepository.findById(id);
    }
    
    public Products save(Products product){
        return productsCrudRepository.save(product);
    }
    
    public void delete (Products product){
        productsCrudRepository.delete(product);
    }
    
    public List<Products> getDescriptions(String description){
        return productsCrudRepository.findByDescriptionLike(description);
    }
    
    public List<Products> getProductsByPrice(Integer price){
        return productsCrudRepository.findByPrice(price);
    }
    
}
