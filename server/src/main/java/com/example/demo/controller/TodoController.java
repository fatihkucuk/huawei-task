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
    @RequestMapping(value="/todos/list", method = RequestMethod.GET)
    public ResponseModel<Todo> getAllTodos(){
        ResponseModel response = new ResponseModel<Todo>();
        try {
            List<Todo> todos = todoService.getAllTodos();
            response.setEntities(todos);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todos/{id}", method = RequestMethod.GET)
    public ResponseModel<Todo> getTodoById(@PathVariable("id") int id){
        ResponseModel response = new ResponseModel<Todo>();
        try {
            Todo todo = todoService.getTodoById(id);
            response.setEntity(todo);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todos/insert", method = RequestMethod.POST)
    public ResponseModel<Todo> insertTodo(@RequestBody Todo todo){
        ResponseModel response = new ResponseModel<Todo>();
        try {
            todo = todoService.insertTodo(todo);
            response.setEntity(todo);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todos/update/{id}", method = RequestMethod.PUT)
    public ResponseModel<Todo> updateTodo(@RequestBody Todo todo, @PathVariable("id") int id){
        ResponseModel response = new ResponseModel<Todo>();
        try {
            todo = todoService.updateTodo(todo);
            response.setEntity(todo);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todos/delete/{id}", method = RequestMethod.DELETE)
    public ResponseModel<Todo> deleteTodo(@PathVariable("id") int id){
        ResponseModel response = new ResponseModel<Todo>();
        try {
            Todo todo = todoService.getTodoById(id);
            todoService.deleteTodo(id);
            response.setEntity(todo);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }
}
