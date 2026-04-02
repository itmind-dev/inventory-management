package com.branchsales.repository;

import com.branchsales.entity.MainItemMultiple;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MainItemMultipleRepository extends JpaRepository<MainItemMultiple, Integer> {
    List<MainItemMultiple> findByMainItemId(Integer mainItemId);
}
