package com.branchsales.controller;

import com.branchsales.entity.GRN;
import com.branchsales.repository.GRNRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grns")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GRNController {

    private final GRNRepository grnRepository;

    @GetMapping
    public ResponseEntity<Page<GRN>> getGRNs(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "DESC") String sortDir
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortField);
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(grnRepository.searchGRNs(search, pageRequest));
        }
        return ResponseEntity.ok(grnRepository.findAll(pageRequest));
    }
}
