package com.example.ecom_proj.service;

import com.example.ecom_proj.dto.OrderResponseDTO;
import com.example.ecom_proj.model.Order;
import com.example.ecom_proj.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.example.ecom_proj.dto.OrderDTO;
import com.example.ecom_proj.model.OrderItem;
import java.time.LocalDateTime;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    public Order saveOrder(Order order) {
        if (order.getItems() != null) {
         for (OrderItem item : order.getItems()) {
             item.setOrder(order); // Set the back-reference
        }
    }
    return orderRepo.save(order);    }

    public List<OrderResponseDTO> getAllOrders() {
        return orderRepo.findAll().stream()
            .map(OrderResponseDTO::from)
            .collect(Collectors.toList());
    }

    public Order getOrderById(Long orderId) {
        Optional<Order> optional = orderRepo.findById(orderId);
        return optional.orElse(null);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = getOrderById(orderId);
        if (order != null) {
            order.setStatus(status);
            return orderRepo.save(order);
        }
        return null;
    }

    public void deleteOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }


     public List<OrderResponseDTO> getAllOrderDTOs() {
    return orderRepo.findAll().stream()
            .map(OrderResponseDTO::from)
            .collect(Collectors.toList());
}



public void createOrderFromDTO(OrderDTO orderDTO) {
    Order order = new Order();
    order.setCustomerName(orderDTO.getCustomerName());
    order.setCustomerEmail(orderDTO.getCustomerEmail());
    order.setAddress(orderDTO.getAddress());
    order.setOrderTime(LocalDateTime.now());
    order.setStatus(orderDTO.getStatus());

    List<OrderItem> items = orderDTO.getItems().stream().map(dto -> {
        OrderItem item = new OrderItem();
        item.setProductId(dto.getProductId());
        item.setProductName(dto.getProductName());
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        item.setOrder(order);
        return item;
    }).collect(Collectors.toList());

    order.setItems(items);
    orderRepo.save(order);
}



} 
