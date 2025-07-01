package com.example.ecom_proj.model;

import java.math.BigDecimal;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data 
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Name cannot be null") // Added validation
    private String name;
    private String description;

    @NotNull(message = "Brand cannot be null") // Added validation
    private String brand;

    @NotNull(message = "Category cannot be null") // Added validation
    private String category;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") // Fix date format
    private Date releaseDate;

    private BigDecimal price;
    private boolean productAvailable;     // Fixed spelling
    private int stockQuantity;            // Fixed name

    private String imageName;
    private String imageType;

    @Lob
    private byte[] imageDate;

}
