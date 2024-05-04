package com.manila.savcmbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Includes @Getter, @Setter, @ToString, @EqualsAndHashCode, etc.
@NoArgsConstructor // Generates a no-argument constructor
@AllArgsConstructor // Generates a constructor with all arguments
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    // Relationship to User
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}
