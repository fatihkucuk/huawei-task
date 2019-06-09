package com.example.demo.service;

import com.example.demo.entity.TodoGroup;
import com.example.demo.model.ResponseModel;
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
    public ResponseModel<TodoGroup> getTodoGroupById(int id) {
        ResponseModel<TodoGroup> response = new ResponseModel<TodoGroup>();
        try {
            Optional<TodoGroup> todoResponse = todoGroupRepository.findById(id);
            TodoGroup todo = todoResponse.get();
            response.setEntity(todo);
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<TodoGroup> getAllTodoGroups() {
        ResponseModel<TodoGroup> response = new ResponseModel<TodoGroup>();
        try {
            List<TodoGroup> todoGroups = todoGroupRepository.findAll();
            response.setEntities(todoGroups);
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<TodoGroup> insertTodoGroup(TodoGroup todoGroup) {
        ResponseModel<TodoGroup> response = new ResponseModel<TodoGroup>();
        try {
            todoGroup = todoGroupRepository.save(todoGroup);
            response.setEntity(todoGroup);
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<TodoGroup> updateTodoGroup(TodoGroup todoGroup) {
        ResponseModel<TodoGroup> response = new ResponseModel<TodoGroup>();
        try {
            todoGroup = todoGroupRepository.save(todoGroup);
            response.setEntity(todoGroup);
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @Override
    public ResponseModel<TodoGroup> deleteTodoGroup(int id) {
        ResponseModel<TodoGroup> response = new ResponseModel<TodoGroup>();
        try {
            todoGroupRepository.deleteById(id);
            response.setEntity(null);
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }
}
