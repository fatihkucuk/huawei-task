package com.example.demo.controller;

import com.example.demo.entity.Todo;
import com.example.demo.entity.TodoGroup;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.TodoGroupService;
import com.example.demo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController

public class TodoGroupController {

    @Autowired
    TodoGroupService todoGroupService;

    @Autowired
    TodoService todoService;

    @RequestMapping(value="/todo-groups/list", method = RequestMethod.GET)
    public ResponseModel<TodoGroup> getAllTodoGroups(){
        ResponseModel response = new ResponseModel<TodoGroup>();
        List<TodoGroup> todoGroupsToReturn = new ArrayList<TodoGroup>();
        try {
            List<TodoGroup> todoGroups = todoGroupService.getAllTodoGroups();
            List<Todo> todos = todoService.getAllTodos();

            for (TodoGroup todoGroup : todoGroups)
            {
                List<Todo> todoList = todoGroup.getTodos();
                for (Todo todo : todos)
                {
                    if(todo.getGroup_id() == todoGroup.getId()){
                        if(todoList == null){
                            todoList = new ArrayList<Todo>();
                        }
                    }
                }
                todoGroup.setTodos(todoList);
            }
            response.setEntities(todoGroupsToReturn);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todo-groups/{id}", method = RequestMethod.GET)
    public ResponseModel<TodoGroup> getTodoById(@PathVariable("id") int id){
        ResponseModel response = new ResponseModel<TodoGroup>();
        try {
            TodoGroup todoGroup = todoGroupService.getTodoGroupById(id);
            response.setEntity(todoGroup);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todo-groups/insert", method = RequestMethod.POST)
    public ResponseModel<TodoGroup> insertTodo(@RequestBody TodoGroup todoGroup){
        ResponseModel response = new ResponseModel<TodoGroup>();
        try {
            todoGroup = todoGroupService.insertTodoGroup(todoGroup);
            response.setEntity(todoGroup);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todo-groups/update/{id}", method = RequestMethod.PUT)
    public ResponseModel<TodoGroup> updateTodo(@RequestBody TodoGroup todoGroup, @PathVariable("id") int id){
        ResponseModel response = new ResponseModel<TodoGroup>();
        try {
            todoGroup = todoGroupService.updateTodoGroup(todoGroup);
            response.setEntity(todoGroup);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value="/todo-groups/delete/{id}", method = RequestMethod.DELETE)
    public ResponseModel<TodoGroup> deleteTodo(@PathVariable("id") int id){
        ResponseModel response = new ResponseModel<TodoGroup>();
        try {
            TodoGroup todoGroup = todoGroupService.getTodoGroupById(id);
            todoGroupService.deleteTodoGroup(id);
            response.setEntity(todoGroup);
            return response;
        }
        catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }
}
