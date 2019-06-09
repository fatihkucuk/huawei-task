package com.example.demo.service;


import com.example.demo.entity.TodoGroup;
import com.example.demo.model.ResponseModel;

import java.util.List;

public interface TodoGroupService {
    ResponseModel<TodoGroup> getTodoGroupById(int id);
    ResponseModel<TodoGroup> getAllTodoGroups();
    ResponseModel<TodoGroup> insertTodoGroup(TodoGroup todoGroup);
    ResponseModel<TodoGroup> updateTodoGroup(TodoGroup todoGroup);
    ResponseModel<TodoGroup> deleteTodoGroup(int id);
}
