package com.ecommerce.inventoryservice.event;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryFailedEvent {

    private Long orderId;

    private String reason;
}