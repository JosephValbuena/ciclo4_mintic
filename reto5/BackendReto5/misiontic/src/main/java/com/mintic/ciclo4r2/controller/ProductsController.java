/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.controller;

import com.mintic.ciclo4r2.model.Products;
import com.mintic.ciclo4r2.services.ProductsService;
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
 * @author JehisonGalarza
 */
@RestController
@RequestMapping("/api/laptop")
@CrossOrigin("*")
public class ProductsController {
    @Autowired
    private ProductsService productsService;
    
    @GetMapping("/all")
    public List<Products> getAll(){
        return productsService.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Products> getProduct(@PathVariable int id) {
        return productsService.getProduct(id);
    }
    
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Products save(@RequestBody Products product) {
        return productsService.save(product);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Boolean deleteProduct(@PathVariable int id){
    return productsService.deleteProduct(id);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Products updateProduct(@RequestBody Products product){
        return productsService.update(product);
    }
    
    @GetMapping("description/{description}")
    public List<Products> getDescriptions(@PathVariable String description){
        return productsService.getDescriptions(description);
    }
    
    @GetMapping("price/{price}")
    public List<Products> getProductsByPrice(@PathVariable Integer price){
        return productsService.getProuctsByPrice(price);
    }
}
