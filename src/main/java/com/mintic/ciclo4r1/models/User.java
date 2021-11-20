package com.mintic.ciclo4r1.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 *
 * @author josva
 */

@Entity
@Table(name= "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 50)
    private String email;
    
    @Column(nullable = false, length = 80)
    private String name;
    
    @Column(nullable = false, length = 50)
    private String password;
    
}
