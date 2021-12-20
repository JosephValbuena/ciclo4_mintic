/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.repositories;

import com.mintic.ciclo4r2.model.Order;
import com.mintic.ciclo4r2.repository.crud.OrderCrudRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author JehisonGalarza
 */
@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCrudRepository;
    
    public List<Order> getAll(){
        return orderCrudRepository.findAll();
    }
    
    public Optional<Order> getOrder(int id){
        return orderCrudRepository.findById(id);
    }
    
    public Order create(Order order){
        return orderCrudRepository.save(order);
    }
    
    public Order update(Order order){
        return orderCrudRepository.save(order);
    }
    
    public void delete(Order order){
        orderCrudRepository.delete(order);
    }
    
    public List<Order> getOrderByZone (String zone){
        return orderCrudRepository.findBySalesManZone(zone);
    }
    
    public List<Order> getOrdersBySalesManId(Integer id){
        return orderCrudRepository.findBySalesManId(id);
    }
    
    public List<Order> getOrdersByStatusAndSalesManId(String satus, Integer id){
        return orderCrudRepository.findByStatusAndSalesManId(satus, id);
    }
    
    public List<Order> getOrdersByDateAndSalesManId(String date, Integer id){
        try{
        return orderCrudRepository.findByRegisterDayAndSalesManId(new SimpleDateFormat("yyyy-MM-dd").parse(date), id);
        }catch (ParseException e){
            e.printStackTrace();
            return null;
        }
    }
    
}
    
