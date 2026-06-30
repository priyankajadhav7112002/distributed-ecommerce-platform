package com.ecommerce.inventoryservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record InventoryRequest (
        @NotBlank(message = "Product name is required")
        String productName,

        @Min(value = 0, message = "Quantity cannot be negative")
        Integer availableQuantity
) {
}
