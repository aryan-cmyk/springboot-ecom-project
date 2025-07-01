package com.example.ecom_proj.service;

import com.example.ecom_proj.repo.OrderRepo;
import com.example.ecom_proj.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderAnalyticsService {

    @Autowired
    private OrderRepo orderRepository;

    @Autowired
    private ProductRepo productRepository;

    public Map<String, Object> getSummary() {
        long totalOrders = orderRepository.count();
        Double totalRevenue = orderRepository.sumTotalRevenue();
        long totalProducts = productRepository.count();

        Map<String, Object> summary = new HashMap<>();
        summary.put("orders", totalOrders);
        summary.put("revenue", totalRevenue != null ? totalRevenue : 0.0);
        summary.put("products", totalProducts);
        return summary;
    }

    public List<Map<String, Object>> getMonthlySales() {
        return orderRepository.findMonthlySales();
    }

    public List<Map<String, Object>> getTopSellingProducts() {
        return orderRepository.findTopProducts();
    }
}
