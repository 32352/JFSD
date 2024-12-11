package com.example.democrud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.democrud.model.user;
import com.example.democrud.repositary.cartificationrepositary;

@Service
public class UserService {

    @Autowired
    private cartificationrepositary userRepository;

    // Add a new user (for signup)
    public void addUser(user user) {
        userRepository.save(user);
    }

    // Get all users
    public List<user> getAll() {
        return userRepository.findAll();
    }

    // Get one user by id
    public user getOne(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    // Update a user by id
    public boolean updateUser(Integer id, user updatedUser) {
        if (userRepository.existsById(id)) {
            updatedUser.setId(id);  // Ensure the ID remains the same during update
            userRepository.save(updatedUser);
            return true;
        }
        return false;
    }

    // Delete a user by id
    public boolean deleteUser(Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}