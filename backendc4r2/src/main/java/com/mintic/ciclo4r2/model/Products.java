/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mintic.ciclo4r2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author JehisonGalarza
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Products")
public class Products {
    @Id
    private Integer id;
    private String  brand;
    private String model;
    private String procesor;
    private String os;
    private String description;
    private String memory;
    private String hardDrive;
    private Boolean availability;
    private Double price;
    private Integer quantity;
    private String photography; 
}