package com.branchsales.repository;

import com.branchsales.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    @Query("SELECT i FROM Invoice i WHERE " +
           "STR(i.id) LIKE CONCAT('%', :search, '%') OR " +
           "STR(i.customerId) LIKE CONCAT('%', :search, '%')")
    Page<Invoice> searchInvoices(@Param("search") String search, Pageable pageable);
}
