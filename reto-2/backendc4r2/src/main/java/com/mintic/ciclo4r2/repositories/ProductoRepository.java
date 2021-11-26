package com.mintic.ciclo4r2.repositories;

import com.mintic.ciclo4r2.model.Product;
import com.mintic.ciclo4r2.repository.crud.ProductRepositoryCrud;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author josva
 */

@Repository
public class ProductoRepository {
    
    @Autowired
    ProductRepositoryCrud productRepositoryCrud;
            
    public List<Product> getAll(){
        return (List<Product>) productRepositoryCrud.findAll();
    }
    
    public Product postProduct(Product product){
        return productRepositoryCrud.save(product);
    }
    
    public Product putProduct(Product product){
        return productRepositoryCrud.save(product);
    }
    
    public void deleteProducto(int id){
        productRepositoryCrud.deleteById(id);
    }
    
    public String deleteAll(){
        productRepositoryCrud.deleteAll();
        return "collección de datos borrada";
    }
}
