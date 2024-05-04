package com.manila.savcmbackend.controller;

import com.manila.savcmbackend.model.Client;
import com.manila.savcmbackend.repository.ClientRepository;
import com.manila.savcmbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/client")
@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
public class ClientController {
    @Autowired
    ClientRepository clientRepository;

    // Get all clients
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
