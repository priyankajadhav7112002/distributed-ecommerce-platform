package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.dto.CreateOrderRequest;
import com.ecommerce.orderservice.dto.DashboardStats;
import com.ecommerce.orderservice.entity.Order;
import com.ecommerce.orderservice.event.OrderCreatedEvent;
import com.ecommerce.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final KafkaProducerService kafkaProducerService;

    public Order createOrder(CreateOrderRequest request){

        Order order = Order.builder()
                .productName(request.productName())
                .quantity(request.quantity())
                .price(request.price())
                .status("CREATED")
                .build();

        Order savedOrder =  orderRepository.save(order);

        OrderCreatedEvent event = OrderCreatedEvent.builder()
                .orderId(savedOrder.getId())
                .productName(savedOrder.getProductName())
                .quantity(savedOrder.getQuantity())
                .price(savedOrder.getPrice())
                .status(savedOrder.getStatus())
                .build();

        kafkaProducerService.publicOrderCreatedEvent(event);

        return savedOrder;
    }

    @Transactional
    public void confirmOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        order.setStatus("CONFIRMED");

        orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }

    public DashboardStats getDashboardStats() {

        long total = orderRepository.count();

        long confirmed =
                orderRepository.countByStatus("CONFIRMED");

        long created =
                orderRepository.countByStatus("CREATED");

        return new DashboardStats(
                total,
                confirmed,
                created
        );
    }
}
