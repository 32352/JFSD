package com.example.democrud.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user_table")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class user {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 100)
    private String firstname;
    @Column(length = 100)
    private String lastname;
    @Column(length = 100)
    private String email;
    @Column(length = 100)
    private String password;   


}
