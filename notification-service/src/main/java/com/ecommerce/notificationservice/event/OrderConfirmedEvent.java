package com.ecommerce.notificationservice.event;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderConfirmedEvent {
    private Long orderId;
    private String status;
}
