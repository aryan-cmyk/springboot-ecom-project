package com.example.ecom_proj.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {
    private Long id;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    private String customerName;
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    private String customerEmail;
    public String getCustomerEmail() {
        return customerEmail;
    }
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    private String address;
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    private LocalDateTime orderTime;
    public LocalDateTime getOrderTime() {
        return orderTime;
    }
    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
    private String status;
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    private List<OrderItemDTO> items;
    public List<OrderItemDTO> getItems() {
        return items;
    }
    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
    @Override
    public String toString() {
        return "OrderDTO [id=" + id + ", customerName=" + customerName + ", customerEmail=" + customerEmail
                + ", address=" + address + ", orderTime=" + orderTime + ", status=" + status + ", items=" + items + "]";
    }
   



}
