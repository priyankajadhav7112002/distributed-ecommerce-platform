package com.ecommerce.inventoryservice.service;

import com.ecommerce.inventoryservice.entity.Inventory;
import com.ecommerce.inventoryservice.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public void reserveInventory(String productName,Integer quantity){

        String normalizedName = productName.trim();

        Inventory inventory = inventoryRepository
                .findByProductNameIgnoreCase(normalizedName)
                .orElseThrow(()-> new RuntimeException("Product not found"));

        if(inventory.getAvailableQuantity() < quantity){
            throw new RuntimeException("Insufficient inventory");
        }

        inventory.setAvailableQuantity(inventory.getAvailableQuantity()-quantity);
        inventoryRepository.save(inventory);
    }

    public Inventory createInventory(String productName, Integer quantity) {

        String normalizedName = productName.trim();

        System.out.println("Searching for: " + normalizedName);

        Optional<Inventory> existingInventory =
                inventoryRepository.findByProductNameIgnoreCase(normalizedName);

        System.out.println("Found existing? " + existingInventory.isPresent());

        if (existingInventory.isPresent()) {
            System.out.println("Updating existing inventory");

            Inventory inventory = existingInventory.get();
            inventory.setAvailableQuantity(
                    inventory.getAvailableQuantity() + quantity
            );

            return inventoryRepository.save(inventory);
        }

        System.out.println("Creating new inventory");

        Inventory inventory = Inventory.builder()
                .productName(normalizedName)
                .availableQuantity(quantity)
                .build();

        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllInventory(){
        return inventoryRepository.findAll();
    }

    public Inventory getInventoryById(Long id){
        return inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));
    }

    public Inventory updateInventory(Long id,
                                     Integer quantity){

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));

        inventory.setAvailableQuantity(quantity);

        return inventoryRepository.save(inventory);
    }
}
