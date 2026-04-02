package com.branchsales.service;

import com.branchsales.entity.MainCategory;
import com.branchsales.entity.MainItem;
import com.branchsales.entity.MainItemMultiple;
import com.branchsales.repository.MainCategoryRepository;
import com.branchsales.repository.MainItemMultipleRepository;
import com.branchsales.repository.MainItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final MainItemRepository itemRepository;
    private final MainCategoryRepository categoryRepository;
    private final MainItemMultipleRepository multipleRepository;

    public Page<MainItem> searchInventory(String search, Integer categoryId, int page, int size, String sortField, String sortDir) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir != null ? sortDir : "ASC"), sortField != null ? sortField : "name");
        Pageable pageable = PageRequest.of(page, size, sort);
        return itemRepository.findInventoryWithFilters(search, categoryId, pageable);
    }

    public List<MainCategory> getActiveCategories() {
        return categoryRepository.findByStatus(1);
    }

    public List<MainItemMultiple> getItemMultiples(Integer itemId) {
        return multipleRepository.findByMainItemId(itemId);
    }
}
