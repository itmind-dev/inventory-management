package com.branchsales.controller;

import com.branchsales.entity.MainCategory;
import com.branchsales.entity.MainItem;
import com.branchsales.entity.MainItemMultiple;
import com.branchsales.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/items")
    public ResponseEntity<Page<MainItem>> getItems(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "ASC") String sortDir
    ) {
        return ResponseEntity.ok(inventoryService.searchInventory(search, categoryId, page, size, sortField, sortDir));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<MainCategory>> getCategories() {
        return ResponseEntity.ok(inventoryService.getActiveCategories());
    }

    @GetMapping("/{id}/multiples")
    public ResponseEntity<List<MainItemMultiple>> getItemMultiples(@PathVariable Integer id) {
        return ResponseEntity.ok(inventoryService.getItemMultiples(id));
    }
}
