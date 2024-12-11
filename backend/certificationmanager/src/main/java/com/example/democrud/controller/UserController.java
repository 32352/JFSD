//package com.example.democrud.controller;
//import java.util.*;
//
//@RestController
//@
//public class EmployeeController {
//
//}
package com.example.democrud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.democrud.model.user;
import com.example.democrud.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Add a new user (for signup)
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody user user) {
        userService.addUser(user);
        return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<user>> getAllUsers() {
        List<user> users = userService.getAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get one user by id
    @GetMapping("/{id}")
    public ResponseEntity<user> getUserById(@PathVariable Integer id) {
        user user = userService.getOne(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a user by id
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody user user) {
        boolean isUpdated = userService.updateUser(id, user);
        if (isUpdated) {
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    // Delete a user by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        boolean isDeleted = userService.deleteUser(id);
        if (isDeleted) {
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}

