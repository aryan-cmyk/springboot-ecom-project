package com.example.ecom_proj.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecom_proj.interfaces.IProductService;
import com.example.ecom_proj.model.Product;
import com.example.ecom_proj.repo.ProductRepo;

@Service
public class ProductService implements IProductService  {

   @Autowired
   private ProductRepo repo;


    public List<Product> getAllProducts() {
        return repo.findAll();
        }


    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }


    public Product addProduct(Product product, MultipartFile image) throws IOException {
       product.setImageName(image.getOriginalFilename());
       product.setImageType(image.getContentType());
       product.setImageDate(image.getBytes());
       return repo.save(product);
    }


    public Product updateProduct(int id, Product product, MultipartFile image) throws IOException {
        product.setImageDate(image.getBytes());  
        product.setImageName(image.getOriginalFilename()); 
        product.setImageType(image.getContentType());
        return  repo.save(product);

    }


    public void deleteProduct(int id) {
       repo.deleteById(id);
    }


    public List<Product> searchProducts(String keyword) {
       return repo.searchProducts(keyword);
    }
    
}
