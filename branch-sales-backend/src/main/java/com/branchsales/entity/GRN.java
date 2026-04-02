package com.branchsales.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "grn")
@Data
public class GRN {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idgrn")
    private Integer id;

    private LocalDate date;
    private Integer warranty;
    private Double amount;
    private Integer status;

    @Column(name = "supplier_idsupplier")
    private Integer supplierId;

    @Column(name = "user_iduser")
    private Integer userId;

    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "storeskey")
    private String storesKey;
}
