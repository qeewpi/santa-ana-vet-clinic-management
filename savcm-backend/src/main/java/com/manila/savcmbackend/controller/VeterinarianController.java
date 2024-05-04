package com.manila.savcmbackend.controller;

import com.manila.savcmbackend.model.Veterinarian;
import com.manila.savcmbackend.repository.VeterinarianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/veterinarian")
@PreAuthorize("hasRole('ADMIN') or hasRole('VETERINARIAN')")
public class VeterinarianController {
    @Autowired
    VeterinarianRepository veterinarianRepository;

    // Get all clients
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    List<Veterinarian> getAllVeterinarians() {
        return veterinarianRepository.findAll();
    }
}
