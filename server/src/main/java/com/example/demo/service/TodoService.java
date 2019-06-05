package com.example.demo.service;

import com.example.demo.entity.Todo;

import java.util.List;

public interface TodoService {
    Todo getTodoById(int id);
    List<Todo> getAllTodos();
    Todo insertTodo(Todo todo);
    Todo updateTodo(Todo todo);
    void deleteTodo(int id);
}
