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


   public Product updateProduct(int id, Product updatedProduct, MultipartFile image) throws IOException {
    // Fetch existing product from DB
    Product existing = repo.findById(id).orElse(null);

    if (existing == null) {
        return null; // or throw custom exception
    }

    // Update fields
    existing.setName(updatedProduct.getName());
    existing.setDescription(updatedProduct.getDescription());
    existing.setBrand(updatedProduct.getBrand());
    existing.setPrice(updatedProduct.getPrice());
    existing.setCategory(updatedProduct.getCategory());
    existing.setReleaseDate(updatedProduct.getReleaseDate());
    existing.setProductAvailable(updatedProduct.isProductAvailable());
    existing.setStockQuantity(updatedProduct.getStockQuantity());

    // Update image only if a new one is provided
    if (image != null && !image.isEmpty()) {
        existing.setImageDate(image.getBytes());
        existing.setImageName(image.getOriginalFilename());
        existing.setImageType(image.getContentType());
    }

    // Save updated product
    return repo.save(existing);
}



    public void deleteProduct(int id) {
       repo.deleteById(id);
    }


    public List<Product> searchProducts(String keyword) {
       return repo.searchProducts(keyword);
    }
    
}
