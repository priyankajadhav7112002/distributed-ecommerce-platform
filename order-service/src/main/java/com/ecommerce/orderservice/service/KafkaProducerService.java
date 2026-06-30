package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.event.OrderConfirmedEvent;
import com.ecommerce.orderservice.event.OrderCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String,Object> kafkaTemplate;

    public void publicOrderCreatedEvent(OrderCreatedEvent event){

        kafkaTemplate.send(
                "order-created-topic",
                event.getOrderId().toString(),
                event)
        ;
    }

    public void publishOrderConfirmedEvent(
            OrderConfirmedEvent event) {

        kafkaTemplate.send(
                "order-confirmed-topic",
                event.getOrderId().toString(),
                event
        );
    }
}
