package com.example.ecom_proj.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecom_proj.model.Product;
import com.example.ecom_proj.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
@Validated
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService service;

    // Greeting test route
    @GetMapping("/")
    public String greet() {
        return "HELLO WORLD";
    }

    // Get all products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
    }

    // Get single product by ID
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProduct(@PathVariable int id) {
        Product product = service.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("message", "Product not found"), HttpStatus.NOT_FOUND);
        }
    }

    // Add a product with image
   @PostMapping(
    value = "/products",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addProduct(@RequestPart("product") @Valid Product product,
                                    BindingResult bindingResult,
                                    @RequestPart("image") MultipartFile image) {
    if (bindingResult.hasErrors()) {
        Map<String, String> errors = new HashMap<>();
        bindingResult.getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

    // Optional image validation
    if (image == null || image.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("image", "Image is required"));
    }

    try {
        Product saved = service.addProduct(product, image);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


    // Get image by product ID
    @GetMapping("products/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId) {
        Product product = service.getProductById(productId);
        if (product != null && product.getImageDate() != null) {
            byte[] imageFile = product.getImageDate();
            return ResponseEntity.ok()
                                 .contentType(MediaType.valueOf(product.getImageType()))
                                 .body(imageFile);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update product and image
    @PutMapping("/products/{id}")
public ResponseEntity<?> updateProduct(@PathVariable int id,
                                       @RequestPart("product") Product product,
                                       @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
    Product updatedProduct = service.updateProduct(id, product, image);
    if (updatedProduct != null) {
        return new ResponseEntity<>(Map.of("message", "Product updated successfully"), HttpStatus.OK);
    } else {
        return new ResponseEntity<>(Map.of("message", "Failed to update product"), HttpStatus.BAD_REQUEST);
    }
}


    // Delete product by ID
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        Product existing = service.getProductById(id);
        if (existing != null) {
            service.deleteProduct(id);
            return new ResponseEntity<>(Map.of("message", "Product deleted successfully"), HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(Map.of("message", "Product not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword)
    {
        System.out.println("searching with keyword"+keyword);
        List<Product> products=service.searchProducts(keyword);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }




}
