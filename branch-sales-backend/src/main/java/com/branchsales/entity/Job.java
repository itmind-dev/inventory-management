package com.branchsales.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "job")
@Data
public class Job {
    @Id
    @Column(name = "idjob")
    private Integer id;

    private String taskcode;
    
    @Column(columnDefinition = "TEXT")
    private String item;
    
    @Column(columnDefinition = "TEXT")
    private String fault;
    
    private String cusname;
    private String address;
    private String mobileno;
    private String landno;
    private Integer status;
    private LocalDate date;
    private LocalDate enddate;

    @Column(name = "scharge")
    private Double serviceCharge;

    private String technician;

    @Column(name = "customer_idcustomer")
    private Integer customerId;
}
