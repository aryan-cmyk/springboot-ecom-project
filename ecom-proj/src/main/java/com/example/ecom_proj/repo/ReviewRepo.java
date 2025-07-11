package com.example.ecom_proj.repo;

import com.example.ecom_proj.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
}
