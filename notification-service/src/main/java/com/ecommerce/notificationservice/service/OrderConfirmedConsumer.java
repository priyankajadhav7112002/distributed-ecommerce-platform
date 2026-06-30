package com.ecommerce.notificationservice.service;

import com.ecommerce.notificationservice.event.OrderConfirmedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderConfirmedConsumer {

    private final EmailService emailService;

    @KafkaListener(topics = "order-confirmed-topic", groupId = "notification-group")
    public void consume(OrderConfirmedEvent event){

        emailService.sendOrderConfirmationEmail(event.getOrderId());

        log.info(
                "Email sent for order {}",
                event.getOrderId()
        );
    }
}
