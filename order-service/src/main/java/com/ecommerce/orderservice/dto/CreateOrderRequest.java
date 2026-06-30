package com.ecommerce.orderservice.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateOrderRequest (

    @NotBlank
    String productName,

    @Min(1)
    Integer quantity,

    @DecimalMin("1.0")
    Double price
){}
