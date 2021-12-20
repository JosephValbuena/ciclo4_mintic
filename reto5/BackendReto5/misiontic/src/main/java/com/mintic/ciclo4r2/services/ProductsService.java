/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.services;

import com.mintic.ciclo4r2.model.Products;
import com.mintic.ciclo4r2.repositories.ProductsRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JehisonGalarza
 */
@Service
public class ProductsService {
    @Autowired
    private ProductsRepository productsRepository;
    
    public List<Products> getAll() {
        return productsRepository.getAll();
    }
    
    public Optional<Products> getProduct(int id) {
        return productsRepository.getProduct(id);
    }
    
    public Products save(Products product) {
        if (product.getId() == null) {
            return productsRepository.save(product);
        } else {
            Optional<Products> oneProduct = productsRepository.getProduct(product.getId());
            
            if (oneProduct.isEmpty()) {
                return productsRepository.save(product);
            } else {
                return product;
            }
        }
    }
    
    
    public Boolean  deleteProduct(int id) {
        Optional<Products> oneProduct = productsRepository.getProduct(id);
        
        if (oneProduct.isEmpty()) {
            return false;
        } else {
           productsRepository.delete(oneProduct.get());           
           return true;
        }    
        
    }
    
    public Products update(Products product) {
        if (product.getId() != null){
            Optional<Products> oneProduct = productsRepository.getProduct(product.getId());
            if (!oneProduct.isEmpty()){
                if (product.getBrand() != null){
                    oneProduct.get().setBrand(product.getBrand());
                }
                if (product.getModel() != null){
                    oneProduct.get().setModel(product.getModel());
                }
                if (product.getProcesor() != null) {
                    oneProduct.get().setProcesor(product.getProcesor());
                }
                if (product.getOs() != null){
                    oneProduct.get().setOs(product.getOs());
                }
                if (product.getDescription() !=null) {
                    oneProduct.get().setDescription(product.getDescription());
                }
                if (product.getMemory() != null) {
                 oneProduct.get().setMemory(product.getMemory());
                }
                if (product.getHardDrive() != null) {
                    oneProduct.get().setHardDrive(product.getHardDrive());
                }
                if (product.getAvailability() !=null) {
                    oneProduct.get().setAvailability(product.getAvailability());
                }
                if (product.getPrice() != null) {
                    oneProduct.get().setPrice(product.getPrice());
                }
                if (product.getQuantity() != null){
                    oneProduct.get().setQuantity(product.getQuantity());
                }
                if (product.getPhotography() != null){
                    oneProduct.get().setPhotography(product.getPhotography());
                }
                
                productsRepository.save(oneProduct.get());
                return oneProduct.get();        
            } else {
                return product;
            }
        } else {
            return product;
        }
    }
    
    public List<Products> getDescriptions(String description){
        return productsRepository.getDescriptions(description);
    }
    
    public List<Products> getProuctsByPrice(Integer price){
        return productsRepository.getProductsByPrice(price);
    }
}