package com.example.demo.service;


import com.example.demo.entity.TodoGroup;

import java.util.List;

public interface TodoGroupService {
    TodoGroup getTodoGroupById(int id);
    List<TodoGroup> getAllTodoGroups();
    TodoGroup insertTodoGroup(TodoGroup todoGroup);
    TodoGroup updateTodoGroup(TodoGroup todoGroup);
    void deleteTodoGroup(int id);
}
