package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/users/list", method = RequestMethod.GET)
    public ResponseModel<User> getAllUsers() {
        ResponseModel<User> response = userService.getAllUsers();
        return response;
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.POST)
    public ResponseModel<User> getUserById(@PathVariable("id") int id) {
        ResponseModel<User> response = userService.getUserById(id);
        return response;
    }

    @RequestMapping(value = "/users/login", method = RequestMethod.POST)
    public ResponseModel<User> login(@RequestBody User user) {
        ResponseModel response = new ResponseModel<User>();
        try {
            String encoded = encode(user.getPassword());
            List<User> users = userService.getAllUsers().getEntities();
            for (User u : users) {
                if (u.getUsername().equals(user.getUsername()) && u.getPassword().equals(encoded)) {
                    response.setEntity(u);
                }
            }
            if (response.getEntity() == null) {
                response.setHasError(true);
                response.setErrorMessage("Invalid username or password");
            }
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value = "/users/signup", method = RequestMethod.POST)
    public ResponseModel<User> signup(@RequestBody User user) {
        ResponseModel response = new ResponseModel<User>();
        try {

            List<User> users = userService.getAllUsers().getEntities();

            for (User u : users) {
                if (u.getUsername().equals(user.getUsername())) {
                    response.setHasError(true);
                    response.setErrorMessage("This user name has already been taken");
                    return response;
                }
            }

            user.setToken(UUID.randomUUID().toString());
            String encoded = encode(user.getPassword());
            user.setPassword(encoded);
            user = userService.insertUser(user).getEntity();
            response.setEntity(user);
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value = "/users/update/{id}", method = RequestMethod.PUT)
    public ResponseModel<User> updateUser(@RequestBody User user, @PathVariable("id") int id) {
        ResponseModel<User> response = userService.updateUser(user);
        return response;
    }

    @RequestMapping(value = "/users/delete/{id}", method = RequestMethod.DELETE)
    public ResponseModel<User> deleteUser(@PathVariable("id") int id) {
        ResponseModel<User> response = userService.deleteUser(id);
        return response;
    }

    private String encode(String password) throws NoSuchAlgorithmException {

        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hashInBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));

        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        String encoded = sb.toString();
        return encoded;
    }
}
