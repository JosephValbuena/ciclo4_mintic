/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.controller;

import com.mintic.ciclo4r2.model.Order;
import com.mintic.ciclo4r2.services.OrderService;
import java.util.Date;
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
@CrossOrigin("*")
@RequestMapping("/api/order/")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("all")
    public List<Order> getAll(){
        return orderService.getAll();
    }
    
    @GetMapping("{id}")
    public Optional<Order> getOrder(@PathVariable("id") Integer id){
        return orderService.getOrder(id);
    }
    
    @PostMapping("new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order create(@RequestBody Order order){
        return orderService.create(order);
    }
    
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order order){
        return orderService.update(order);
    }
    
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable ("id") Integer id){
        return orderService.delete(id);
    }
    
    @GetMapping("zona/{zone}")
    public List<Order> getOrdersByZone(@PathVariable("zone") String zone){
        return orderService.getOrderByZone(zone);
    }
    
    @GetMapping("salesman/{id}")
    public List<Order> getOrdersBySalesManId(@PathVariable("id") Integer id){
        return orderService.getOrdersBySalesManId(id);
    }
    
    @GetMapping("state/{status}/{id}")
    public List<Order> getOrdersBySatusAndSalesManId(String status, Integer id){
        return orderService.getOrdersBySatusAndSalesManId(status, id);
    }
    
    @GetMapping("date/{date}/{id}")
    public List<Order> getOrdersByDateAndSalesManId(@PathVariable("date") String date, @PathVariable("id") Integer id){
        return orderService.getOrdersByDateAndSalesManId(date, id);
    }
}
