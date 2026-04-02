package com.branchsales.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;

@Entity
@Table(name = "main_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class MainItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idmain_item")
    private Integer id;

    @Column(name = "Main_category_idMain_category")
    private Integer mainCategoryId;

    private String name;
    private Integer status;
    private String description;
    
    @Column(name = "up")
    private Double unitPrice;

    @Column(name = "sp")
    private Double sellingPrice;

    @Column(name = "wsp")
    private Double wholesalePrice;

    private Double qty;
    private String code;
    private Integer low;
    private String cat1;
    private String cat2;
    private Integer withserial;
    private Integer warranty;
    private Double discount;
    
    @Column(name = "discount_percentage")
    private Double discountPercentage;
    
    @Column(name = "short_code")
    private String shortCode;
    
    private LocalDate mfd;
    private LocalDate exp;
    
    @Column(name = "multi_price")
    private Integer multiPrice;
    
    private Integer cloud;
    private Integer active;
    private String supplier;
    private Integer disavailable;
    private Double price1;
    private Integer haveprice1;
    private Integer price1warranty;
    private String sup_models;
    private Integer cloud_id;
    private Integer technical_qty;
    private Integer showroom_qty;
    private Integer warrenty_qty;
    private Integer damage_qty;
    private Integer is_bulk;
    private String image_url;
    private String carat;
    private Double weight;
    private Double eachweight;
}
