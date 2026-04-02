package com.branchsales.repository;

import com.branchsales.entity.MainItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MainItemRepository extends JpaRepository<MainItem, Integer> {

    @Query("SELECT i FROM MainItem i WHERE " +
           "(:search IS NULL OR LOWER(i.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(i.code) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:categoryId IS NULL OR i.mainCategoryId = :categoryId)")
    Page<MainItem> findInventoryWithFilters(
            @Param("search") String search,
            @Param("categoryId") Integer categoryId,
            Pageable pageable
    );
}
