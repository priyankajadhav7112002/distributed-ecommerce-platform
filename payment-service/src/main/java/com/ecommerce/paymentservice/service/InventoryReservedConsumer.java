package com.ecommerce.paymentservice.service;

import com.ecommerce.paymentservice.entity.Payment;
import com.ecommerce.paymentservice.event.InventoryReservedEvent;
import com.ecommerce.paymentservice.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class InventoryReservedConsumer {

    private final PaymentService paymentService;
    private final KafkaProducerService kafkaProducerService;

    @KafkaListener(topics = "inventory-reserved-topic",groupId = "payment-group")
    public void consume(InventoryReservedEvent event){

        log.info("STEP 1 - Received Event {}", event);

        Payment payment = paymentService.processPayment(event);

        log.info("STEP 2 - Payment Saved {}", payment.getId());

        PaymentCompletedEvent paymentCompletedEvent = PaymentCompletedEvent.builder()
                .orderId(payment.getOrderId())
                .paymentStatus("SUCCESS")
                .build();

        kafkaProducerService.publishPaymentCompletedEvent(paymentCompletedEvent);

        log.info(
                "Payment Completed For Order {}",
                payment.getOrderId());

    }
}
