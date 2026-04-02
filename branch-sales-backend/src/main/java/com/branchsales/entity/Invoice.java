package com.branchsales.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "invoice")
@Data
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idinvoice")
    private Integer id;

    private LocalDate date;
    
    @Column(name = "in_time")
    private LocalDateTime inTime;

    private Double amount;
    private Double total;
    private Double discount;
    private Double paid;
    private Integer status;

    @Column(name = "user_iduser")
    private Integer userId;

    @Column(name = "customer_idcustomer")
    private Integer customerId;
    
    private String type;
    private String note;
}
