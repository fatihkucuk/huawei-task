package com.example.demo.service;

import com.example.demo.entity.Todo;
import com.example.demo.model.ResponseModel;

import java.util.List;

public interface TodoService {
    ResponseModel<Todo> getTodoById(int id);
    ResponseModel<Todo> getAllTodos();
    ResponseModel<Todo> insertTodo(Todo todo);
    ResponseModel<Todo> updateTodo(Todo todo);
    ResponseModel<Todo> deleteTodo(int id);
}
