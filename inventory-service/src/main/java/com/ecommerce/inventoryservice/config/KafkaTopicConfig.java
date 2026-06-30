package com.ecommerce.inventoryservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic inventoryReservedTopic(){
        return TopicBuilder
                .name("inventory-reserved-topic")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic inventoryFailedTopic() {

        return TopicBuilder
                .name("inventory-failed-topic")
                .partitions(3)
                .replicas(1)
                .build();
    }

}
