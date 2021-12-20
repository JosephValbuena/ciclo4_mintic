/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.repository.crud;

import com.mintic.ciclo4r2.model.Order;
import java.util.Date;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author JehisonGalarza
 */

public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    List<Order> findBySalesManZone(String zone);
    List<Order> findBySalesManId(Integer id);
    List<Order> findByStatusAndSalesManId(String status, Integer id);
    List<Order> findByRegisterDayAndSalesManId(Date date, Integer id);
}
