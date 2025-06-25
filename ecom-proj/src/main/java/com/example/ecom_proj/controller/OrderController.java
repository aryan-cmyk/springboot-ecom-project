package com.example.ecom_proj.controller;

import com.example.ecom_proj.dto.OrderResponseDTO;
import com.example.ecom_proj.model.Order;
import com.example.ecom_proj.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") // React's dev server
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @GetMapping
    public List<OrderResponseDTO> getOrders() {
        return orderService.getAllOrders();
    }

   @PutMapping("/{orderId}/status")
public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
    Order order = orderService.getOrderById(orderId);
    if (order == null) {
        return ResponseEntity.notFound().build();
    }
    order.setStatus(status);
    orderService.saveOrder(order);
    return ResponseEntity.ok().build();
}
















}
