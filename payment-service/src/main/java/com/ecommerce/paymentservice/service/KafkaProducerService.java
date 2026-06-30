package com.ecommerce.paymentservice.service;

import com.ecommerce.paymentservice.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String,Object> kafkaTemplate;

    public void publishPaymentCompletedEvent(
            PaymentCompletedEvent event) {

        kafkaTemplate.send(
                "payment-completed-topic",
                event.getOrderId().toString(),
                event
        );
    }
}