package com.mintic.ciclo4r2.services;

import com.mintic.ciclo4r2.model.Product;
import com.mintic.ciclo4r2.repositories.ProductoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author josva
 */

@Service
public class ProductService {
    
    @Autowired
    ProductoRepository productoRepository;
    
    public List<Product> getAll(){
        return productoRepository.getAll();
    }
    
    public Product postProduct(Product product){
        return productoRepository.postProduct(product);
    }
    
    public Product putProduct(Product product){
        return productoRepository.putProduct(product);
    }
    
    public void deleteProduct(int id){
        productoRepository.deleteProducto(id);
    }
    
    public String deleteAll(){
        return productoRepository.deleteAll();
    }
    
}
