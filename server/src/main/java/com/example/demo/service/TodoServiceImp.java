package com.example.demo.service;

import com.example.demo.entity.Todo;
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
    public Todo getTodoById(int id) {
        Optional<Todo> todoResponse = todoRepository.findById(id);
        Todo todo = todoResponse.get();
        return todo;
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo insertTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public Todo updateTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodo(int id) {
        todoRepository.deleteById(id);
    }
}

