package com.cuatroa.retotres.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 
 * @author desaextremo
 */
@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accessory {
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
