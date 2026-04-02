package com.branchsales.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "supplier")
@Data
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idsupplier")
    private Integer id;

    private String name;
    private String tel;
    private String tel2;
    private String address;
    private String email;
    private Integer status;
}
