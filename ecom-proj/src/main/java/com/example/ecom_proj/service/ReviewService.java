package com.example.ecom_proj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ecom_proj.model.Product;
import com.example.ecom_proj.model.Review;
import com.example.ecom_proj.repo.ProductRepo;
import com.example.ecom_proj.repo.ReviewRepo;

import java.time.LocalDateTime;
import java.util.List;
import com.example.ecom_proj.dto.ReviewRequestDTO;
import com.example.ecom_proj.dto.ReviewResponseDTO;



@Service
public class ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private ProductRepo productRepo;

public ResponseEntity<?> addReview(int productId, ReviewRequestDTO requestDTO) {
    Product product = productRepo.findById(productId).orElse(null);
    if (product == null) {
        return ResponseEntity.badRequest().body("Product not found");
    }

    Review review = new Review();
    review.setUsername(requestDTO.getUsername());
    review.setComment(requestDTO.getComment());
    review.setRating(requestDTO.getRating());
    review.setProduct(product);
    review.setCreatedAt(LocalDateTime.now());

    Review savedReview = reviewRepo.save(review);

    ReviewResponseDTO responseDTO = new ReviewResponseDTO();
    responseDTO.setId(savedReview.getId());
    responseDTO.setUsername(savedReview.getUsername());
    responseDTO.setComment(savedReview.getComment());
    responseDTO.setRating(savedReview.getRating());
    responseDTO.setCreatedAt(savedReview.getCreatedAt());

    return ResponseEntity.ok(responseDTO);
}

public List<ReviewResponseDTO> getReviewsByProductId(Long productId) {
    List<Review> reviews = reviewRepo.findByProductId(productId);
    return reviews.stream().map(review -> {
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setId(review.getId());
        dto.setUsername(review.getUsername());
        dto.setComment(review.getComment());
        dto.setRating(review.getRating());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }).toList();
}

}

