package com.branchsales.repository;

import com.branchsales.entity.GRN;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GRNRepository extends JpaRepository<GRN, Integer> {
    @Query("SELECT g FROM GRN g WHERE " +
           "CAST(g.id AS string) LIKE CONCAT('%', :search, '%') OR " +
           "g.invoiceNo LIKE CONCAT('%', :search, '%')")
    Page<GRN> searchGRNs(@Param("search") String search, Pageable pageable);
}
