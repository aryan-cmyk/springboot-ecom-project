package com.example.ecom_proj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecom_proj.dto.ReviewRequestDTO;
import com.example.ecom_proj.dto.ReviewResponseDTO;
import com.example.ecom_proj.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

   @PostMapping("/{productId}")
   public ResponseEntity<?> addReview(@PathVariable int productId, @RequestBody ReviewRequestDTO reviewDTO) {
      return reviewService.addReview(productId, reviewDTO);
}

   @GetMapping("/{productId}")
   public ResponseEntity<List<ReviewResponseDTO>> getReviews(@PathVariable Long productId) {
      return ResponseEntity.ok(reviewService.getReviewsByProductId(productId));
}
}

