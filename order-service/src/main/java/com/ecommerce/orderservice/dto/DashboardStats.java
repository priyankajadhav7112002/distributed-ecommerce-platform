package com.ecommerce.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStats {

    private Long totalOrders;
    private Long confirmedOrders;
    private Long createdOrders;

}