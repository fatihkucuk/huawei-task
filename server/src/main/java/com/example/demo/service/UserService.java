package com.example.demo.service;

import com.example.demo.entity.User;
import java.util.List;

public interface UserService {
     User getUserById(int id);
     List<User> getAllUsers();
     User insertUser(User user);
     User updateUser(User user);
     void deleteUser(int id);
}
