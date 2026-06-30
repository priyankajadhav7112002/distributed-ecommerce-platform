package com.ecommerce.notificationservice.service;

import com.ecommerce.notificationservice.entity.Notification;
import com.ecommerce.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final NotificationRepository notificationRepository;

    public void sendOrderConfirmationEmail(Long orderId){

        String email = "priyankajadhav7112002@gmail.com";

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);

        message.setSubject("Order Confirmed");

        message.setText(
                "Your order "
                        + orderId
                        + " has been confirmed successfully."
        );

         javaMailSender.send(message);

        Notification notification =
                Notification.builder()
                        .orderId(orderId)
                        .email(email)
                        .subject(message.getSubject())
                        .message(message.getText())
                        .status("SENT")
                        .build();

        notificationRepository.save(notification);
    }
}
