package com.example.ecom_proj.dto;

import com.example.ecom_proj.model.Order;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderResponseDTO {
    private Long id;
    private String customerEmail;
    private String status;
    private String address;
    private LocalDateTime orderTime;
    private List<OrderItemDTO> items;

    public static OrderResponseDTO from(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setStatus(order.getStatus());
        dto.setAddress(order.getAddress());
        dto.setOrderTime(order.getOrderTime());

        dto.setItems(order.getItems().stream()
                          .map(OrderItemDTO::from)
                          .collect(Collectors.toList()));
        return dto;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}
