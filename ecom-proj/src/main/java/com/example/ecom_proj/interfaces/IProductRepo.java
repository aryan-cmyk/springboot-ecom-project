package com.example.ecom_proj.interfaces;

import java.util.List;
import java.util.Optional;

import com.example.ecom_proj.model.Product;

public interface IProductRepo {

    List<Product> findAll();

    Optional<Product> findById(int id);

    Product save(Product product);

    void deleteById(int id);

    List<Product> searchProducts(String keyword);
}
