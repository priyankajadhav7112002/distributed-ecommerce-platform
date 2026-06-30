package com.ecommerce.inventoryservice.service;

import com.ecommerce.inventoryservice.event.InventoryReservedEvent;
import com.ecommerce.inventoryservice.event.OrderCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderCreatedConsumer {

    private final InventoryService inventoryService;
    private final KafkaProducerService kafkaProducerService;

    @KafkaListener(topics = "order-created-topic",groupId = "inventory-group")
    public void consume(OrderCreatedEvent event){
        log.info(
                "OrderId={}, Product={}, Quantity={}",
                event.getOrderId(),
                event.getProductName(),
                event.getQuantity()
        );

        inventoryService.reserveInventory(event.getProductName(), event.getQuantity());

        InventoryReservedEvent reservedEvent = InventoryReservedEvent
                .builder()
                .orderId(event.getOrderId())
                .productName(event.getProductName())
                        .quantity(event.getQuantity())
                                .build();
        kafkaProducerService.publishInventoryReservedEvent(reservedEvent);

        log.info(
                "Inventory Reserved Event Published For Order {}",
                event.getOrderId()
        );
    }
}
