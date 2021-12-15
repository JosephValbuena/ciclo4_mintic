package com.mintic.ciclo4r2;

import com.mintic.ciclo4r2.repository.crud.OrderCrudRepository;
import com.mintic.ciclo4r2.repository.crud.ProductsCrudRepository;
import com.mintic.ciclo4r2.repository.crud.UserRepositoryCrud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Ciclo4r3Application implements CommandLineRunner{
    
    @Autowired
    private OrderCrudRepository orderCrudRepository;
    @Autowired
    private UserRepositoryCrud userCrudRepository;
    @Autowired
    private ProductsCrudRepository productsCrudRepository;

    public static void main(String[] args) {
    	SpringApplication.run(Ciclo4r3Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        
        orderCrudRepository.deleteAll();
        userCrudRepository.deleteAll();
        productsCrudRepository.deleteAll();
        

    }
}   
