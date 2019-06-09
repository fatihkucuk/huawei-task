package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.model.ResponseModel;

import java.util.List;

public interface UserService {
     ResponseModel<User> getUserById(int id);
     ResponseModel<User> getAllUsers();
     ResponseModel<User> insertUser(User user);
     ResponseModel<User> updateUser(User user);
     ResponseModel<User> deleteUser(int id);
}
