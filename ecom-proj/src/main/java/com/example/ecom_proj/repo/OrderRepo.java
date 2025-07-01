package com.example.ecom_proj.repo;

import com.example.ecom_proj.model.Order;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepo extends JpaRepository<Order, Long> {  

   @Query("SELECT SUM(oi.price * oi.quantity) FROM Order o JOIN o.items oi")
    Double sumTotalRevenue();

    @Query("SELECT NEW map(FUNCTION('MONTH', o.orderTime) as month, SUM(oi.price * oi.quantity) as revenue) " +
           "FROM Order o JOIN o.items oi GROUP BY FUNCTION('MONTH', o.orderTime) ORDER BY month")
    List<Map<String, Object>> findMonthlySales();

    @Query("SELECT NEW map(oi.productName as productName, SUM(oi.quantity) as totalSold) " +
           "FROM Order o JOIN o.items oi GROUP BY oi.productName ORDER BY totalSold DESC")
    List<Map<String, Object>> findTopProducts();
}


