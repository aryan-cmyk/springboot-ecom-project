package com.example.ecom_proj.repo;

import com.example.ecom_proj.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {
}
