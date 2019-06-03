package com.example.demo.service;

import com.example.demo.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
     Optional<User> getUserById(int id);
     List<User> getAllUsers();

}
