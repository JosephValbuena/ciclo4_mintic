package com.mintic.ciclo4r2.controller;

import com.mintic.ciclo4r2.model.Product;
import com.mintic.ciclo4r2.services.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author josva
 */

@RestController
@RequestMapping("/api/laptop/")
@CrossOrigin("*")
public class ProductController {
    
    @Autowired
    ProductService productService;
    
    @GetMapping("all")
    public List<Product> getAll(){
        return productService.getAll();
    }
    
    @PostMapping("new")
    public Product postProduct(@RequestBody Product product){
        return productService.postProduct(product);
    }
    
    @PutMapping("update")
    public Product putProduct(@RequestBody Product product){
        return productService.putProduct(product);
    }
    
    @DeleteMapping("{id}")
    public void deleteProduct(@PathVariable int id){
        productService.deleteProduct(id);
    }
    
    @DeleteMapping("delete")
    public String deleteAll(){
        return productService.deleteAll();
    }
}
