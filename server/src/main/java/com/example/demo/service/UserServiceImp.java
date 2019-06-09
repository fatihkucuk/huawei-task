package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.model.ResponseModel;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service("userService")
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseModel<User> getUserById(int id) {
        ResponseModel<User> response = new ResponseModel<User>();
        try{
            Optional<User> userResponse = userRepository.findById(id);
            User user = userResponse.get();
            response.setEntity(user);
            return response;
        }
        catch (Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<User> getAllUsers() {
        ResponseModel<User> response = new ResponseModel<User>();
        try{
            List<User> users = userRepository.findAll();
            response.setEntities(users);
            return response;
        }
        catch (Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<User> insertUser(User user) {
        ResponseModel<User> response = new ResponseModel<User>();
        try{
            user = userRepository.save(user);
            response.setEntity(user);
            return response;
        }
        catch (Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<User> updateUser(User user) {
        ResponseModel<User> response = new ResponseModel<User>();
        try{
            user = userRepository.save(user);
            response.setEntity(user);
            return response;
        }
        catch (Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<User> deleteUser(int id) {
        ResponseModel<User> response = new ResponseModel<User>();
        try{
            userRepository.deleteById(id);
            response.setEntity(null);
            return response;
        }
        catch (Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }
}
