package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.entity.Todo;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TodoController {
    @Autowired
    TodoService todoService;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/todos/list", method = RequestMethod.GET)
    public ResponseModel<Todo> getAllTodos(HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<Todo> response = todoService.getAllTodos();
        return response;
    }

    @RequestMapping(value = "/todos/{id}", method = RequestMethod.GET)
    public ResponseModel<Todo> getTodoById(@PathVariable("id") int id, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<Todo> response = todoService.getTodoById(id);
        return response;
    }

    @RequestMapping(value = "/todos/insert", method = RequestMethod.POST)
    public ResponseModel<Todo> insertTodo(@RequestBody Todo todo, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<Todo> response = todoService.insertTodo(todo);
        return response;
    }

    @RequestMapping(value = "/todos/update", method = RequestMethod.PUT)
    public ResponseModel<Todo> updateTodo(@RequestBody Todo todo, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<Todo> response = todoService.updateTodo(todo);
        return response;
    }

    @RequestMapping(value = "/todos/delete/{id}", method = RequestMethod.DELETE)
    public ResponseModel<Todo> deleteTodo(@PathVariable("id") int id, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<Todo> response = todoService.deleteTodo(id);
        return response;
    }

    public boolean isAuthorized(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token = authorization.substring(7);

        List<User> users = userService.getAllUsers().getEntities();
        boolean loggedIn = false;

        for (User user : users) {
            if (token.equals(user.getToken())) {
                loggedIn = true;
            }
        }
        return loggedIn;
    }

    public ResponseModel getUnAuthorizedResponse() {
        ResponseModel response = new ResponseModel();
        response.setHasError(true);
        response.setErrorMessage("You are not logged in");
        return response;
    }
}
