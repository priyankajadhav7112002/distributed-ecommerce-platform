package com.ecommerce.notificationservice.controller;

import com.ecommerce.notificationservice.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TestController {

    private final EmailService emailService;

    @GetMapping("/test-email")
    public String sendEmail(){

        emailService.sendOrderConfirmationEmail(1L);
        return "Email sent";
    }
}
