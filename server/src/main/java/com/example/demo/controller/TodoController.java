package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.entity.Todo;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TodoController {
    @Autowired
    TodoService todoService;

    @RequestMapping(value = "/todos/list", method = RequestMethod.GET)
    public ResponseModel<Todo> getAllTodos() {
        ResponseModel<Todo> response = todoService.getAllTodos();
        return response;
    }

    @RequestMapping(value = "/todos/{id}", method = RequestMethod.GET)
    public ResponseModel<Todo> getTodoById(@PathVariable("id") int id) {
        ResponseModel<Todo> response = todoService.getTodoById(id);
        return response;
    }

    @RequestMapping(value = "/todos/insert", method = RequestMethod.POST)
    public ResponseModel<Todo> insertTodo(@RequestBody Todo todo) {
        ResponseModel<Todo> response = todoService.insertTodo(todo);
        return response;
    }

    @RequestMapping(value = "/todos/update", method = RequestMethod.PUT)
    public ResponseModel<Todo> updateTodo(@RequestBody Todo todo) {
        ResponseModel<Todo> response = todoService.updateTodo(todo);
        return response;
    }

    @RequestMapping(value = "/todos/delete/{id}", method = RequestMethod.DELETE)
    public ResponseModel<Todo> deleteTodo(@PathVariable("id") int id) {
        ResponseModel<Todo> response = todoService.getTodoById(id);
        return response;
    }
}
