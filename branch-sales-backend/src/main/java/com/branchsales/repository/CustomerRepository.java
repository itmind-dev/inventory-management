package com.branchsales.repository;

import com.branchsales.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "c.tel LIKE CONCAT('%', :search, '%') OR " +
           "c.address LIKE CONCAT('%', :search, '%')")
    Page<Customer> searchCustomers(@Param("search") String search, Pageable pageable);
}
