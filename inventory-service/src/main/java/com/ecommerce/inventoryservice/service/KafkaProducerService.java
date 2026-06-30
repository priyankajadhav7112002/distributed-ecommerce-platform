package com.ecommerce.inventoryservice.service;

import com.ecommerce.inventoryservice.event.InventoryFailedEvent;
import com.ecommerce.inventoryservice.event.InventoryReservedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String,Object> kafkaTemplate;

    public void publishInventoryReservedEvent(InventoryReservedEvent event){
        kafkaTemplate.send(
                "inventory-reserved-topic",
                event.getOrderId().toString(),
                event);
    }

//    public void publishInventoryFailedEvent(
//            InventoryFailedEvent event){
//
//        kafkaTemplate.send(
//                "inventory-failed-topic",
//                event.getOrderId().toString(),
//                event
//        );
//    }
}
