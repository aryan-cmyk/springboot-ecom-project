package com.example.ecom_proj.interfaces;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.ecom_proj.model.Product;

public interface IProductService {
    
    List<Product> getAllProducts();

    Product getProductById(int id);

    Product addProduct(Product product, MultipartFile image) throws IOException;

    Product updateProduct(int id, Product product, MultipartFile image) throws IOException;

    void deleteProduct(int id);

    List<Product> searchProducts(String keyword);
}
