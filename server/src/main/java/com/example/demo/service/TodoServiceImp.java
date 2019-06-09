package com.example.demo.service;

import com.example.demo.entity.Todo;
import com.example.demo.model.ResponseModel;
import com.example.demo.repository.TodoRepository;
import com.example.demo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service("todoService")
public class TodoServiceImp implements TodoService {

    @Autowired
    TodoRepository todoRepository;

    @Override
    public ResponseModel<Todo> getTodoById(int id) {
        ResponseModel<Todo> response = new ResponseModel<Todo>();
        try{
            Optional<Todo> todoResponse = todoRepository.findById(id);
            Todo todo = todoResponse.get();
            response.setEntity(todo);
            return response;
        }
        catch(Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<Todo> getAllTodos() {
        ResponseModel<Todo> response = new ResponseModel<Todo>();
        try{
            List<Todo> todos = todoRepository.findAll();
            response.setEntities(todos);
            return response;
        }
        catch(Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<Todo> insertTodo(Todo todo) {
        ResponseModel<Todo> response = new ResponseModel<Todo>();
        try{
            todo = todoRepository.save(todo);
            response.setEntity(todo);
            return response;
        }
        catch(Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<Todo> updateTodo(Todo todo) {
        ResponseModel<Todo> response = new ResponseModel<Todo>();
        try{
            todo = todoRepository.save(todo);
            response.setEntity(todo);
            return response;
        }
        catch(Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<Todo> deleteTodo(int id) {
        ResponseModel<Todo> response = new ResponseModel<Todo>();
        try{
            todoRepository.deleteById(id);
            response.setEntity(null);
            return response;
        }
        catch(Exception ex){
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }
}

