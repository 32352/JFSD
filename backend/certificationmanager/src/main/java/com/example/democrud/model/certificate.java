package com.example.democrud.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="cerification_table")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class certificate{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 100)
    private String name;
    @Column(length = 100)
    private String issuedname;
    @Column(length = 100)
    private String startdate;   
     @Column(length = 100)
    private String enddate;

}
