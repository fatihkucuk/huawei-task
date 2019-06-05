package com.example.demo.service;

import com.example.demo.entity.TodoGroup;
import com.example.demo.repository.TodoGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("todoGroupService")

public class TodoGroupServiceImp implements TodoGroupService {

    @Autowired
    TodoGroupRepository todoGroupRepository;

    @Override
    public TodoGroup getTodoGroupById(int id) {
        Optional<TodoGroup> userResponse = todoGroupRepository.findById(id);
        TodoGroup todo = userResponse.get();
        return todo;    }

    @Override
    public List<TodoGroup> getAllTodoGroups() {
        return todoGroupRepository.findAll();    }


    @Override
    public TodoGroup insertTodoGroup(TodoGroup todoGroup) {
        return todoGroupRepository.save(todoGroup);    }

    @Override
    public TodoGroup updateTodoGroup(TodoGroup todoGroup) {
        return todoGroupRepository.save(todoGroup);
    }

    @Override
    public void deleteTodoGroup(int id) {
        todoGroupRepository.deleteById(id);
    }
}
