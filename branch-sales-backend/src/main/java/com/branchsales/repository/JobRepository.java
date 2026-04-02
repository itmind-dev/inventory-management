package com.branchsales.repository;

import com.branchsales.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobRepository extends JpaRepository<Job, Integer> {
    @Query("SELECT j FROM Job j WHERE " +
           "LOWER(j.taskcode) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(j.cusname) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "j.mobileno LIKE CONCAT('%', :search, '%')")
    Page<Job> searchJobs(@Param("search") String search, Pageable pageable);
}
