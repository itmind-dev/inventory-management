package com.branchsales.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
@Table(name = "main_item_multiple")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class MainItemMultiple {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "main_item_multiple")
    private Integer id;

    @Column(name = "idmain_item")
    private Integer mainItemId;

    private LocalDateTime date;

    // DB column "price" = selling price for this batch
    @Column(name = "price")
    private Double price;

    private Double qty;

    private Integer status;

    // DB column "up" = unit/cost price for this batch
    @Column(name = "up")
    private Double unitPrice;

    private Integer cloud;
}
