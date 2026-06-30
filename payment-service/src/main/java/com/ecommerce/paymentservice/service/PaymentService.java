package com.ecommerce.paymentservice.service;

import com.ecommerce.paymentservice.entity.Payment;
import com.ecommerce.paymentservice.event.InventoryReservedEvent;
import com.ecommerce.paymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public Payment processPayment(InventoryReservedEvent event){

        log.info("Inside processPayment()");

//        if(event.getProductName()
//                .equalsIgnoreCase("Laptop")) {
//
//            throw new RuntimeException(
//                    "Payment Gateway Down");
//        }

        Payment payment = Payment.builder()
                .orderId(event.getOrderId())
                .productName(event.getProductName())
                .quantity(event.getQuantity())
                .paymentStatus("SUCCESS")
                .build();

        log.info("Before save");

        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));
    }

}
