package com.ecommerce.paymentservice.event;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryReservedEvent {

    private Long orderId;
    private String productName;
    private Integer quantity;
}
