package com.example.ecom_proj.controller;

import com.example.ecom_proj.service.OrderAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class OrderAnalyticsController {

    @Autowired
    private OrderAnalyticsService analyticsService;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        return analyticsService.getSummary();
    }

    @GetMapping("/monthly-sales")
    public List<Map<String, Object>> getMonthlySales() {
        return analyticsService.getMonthlySales();
    }

    @GetMapping("/top-products")
    public List<Map<String, Object>> getTopSellingProducts() {
        return analyticsService.getTopSellingProducts();
    }
}
