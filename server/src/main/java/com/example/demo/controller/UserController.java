package com.example.demo.controller;
import com.example.demo.entity.User;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired UserService userService;
    @RequestMapping(value="/users/list",method = RequestMethod.GET)
    public ResponseModel<User> getAllUsers(){
        ResponseModel response = new ResponseModel<User>();
        try {
            List<User> users = userService.getAllUsers();
            response.setEntities(users);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/users/{id}", method = RequestMethod.GET)
    public ResponseModel<User> getUserById(@PathVariable("id") int id){
        ResponseModel response = new ResponseModel<User>();
        try {
            User user = userService.getUserById(id);
            response.setEntity(user);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/users/insert", method = RequestMethod.POST)
    public ResponseModel<User> insertUser(@RequestBody Map<String, String> body){
        ResponseModel response = new ResponseModel<User>();
        try {
            User user = new User();
            user = setUserFields(body, user);
            user = userService.insertUser(user);
            response.setEntity(user);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/users/update/{id}", method = RequestMethod.PUT)
    public ResponseModel<User> updateUser(@RequestBody Map<String, String> body, @PathVariable("id") int id){
        ResponseModel response = new ResponseModel<User>();
        try {
            User user = userService.getUserById(id);
            user = setUserFields(body, user);
            user = userService.updateUser(user);
            response.setEntity(user);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/users/delete/{id}", method = RequestMethod.DELETE)
    public ResponseModel<User> deleteUser(@PathVariable("id") int id){
        ResponseModel response = new ResponseModel<User>();
        try {
            User user = userService.getUserById(id);
            userService.deleteUser(id);
            response.setEntity(user);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    private User setUserFields(@RequestBody Map<String, String> body, User user) {
        String name = body.get("name");
        String username = body.get("username");
        String password = body.get("password");
        String token = body.get("token");

        user.setName(name);
        user.setUsername(username);
        user.setPassword(password);
        user.setToken(token);
        return user;
    }
}
