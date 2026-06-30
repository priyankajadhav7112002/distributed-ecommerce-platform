package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.event.OrderConfirmedEvent;
import com.ecommerce.orderservice.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentCompletedConsumer {

    private final OrderService orderService;
    private final KafkaProducerService kafkaProducerService;

    @KafkaListener(
            topics = "payment-completed-topic",
            groupId = "order-group"
    )
    public void consume(PaymentCompletedEvent event) {

        orderService.confirmOrder(event.getOrderId());

        // Publish next event
        OrderConfirmedEvent orderConfirmedEvent =
                OrderConfirmedEvent.builder()
                        .orderId(event.getOrderId())
                        .status("CONFIRMED")
                        .build();

        kafkaProducerService.publishOrderConfirmedEvent(
                orderConfirmedEvent
        );

        log.info(
                "Order {} confirmed successfully",
                event.getOrderId()
        );
    }
}