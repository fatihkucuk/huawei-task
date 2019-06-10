package com.example.demo.controller;

import com.example.demo.entity.Todo;
import com.example.demo.entity.TodoGroup;
import com.example.demo.entity.User;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.TodoGroupService;
import com.example.demo.service.TodoService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TodoGroupController {

    @Autowired
    TodoGroupService todoGroupService;

    @Autowired
    TodoService todoService;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/todo-groups/list", method = RequestMethod.POST)
    public ResponseModel<TodoGroup> getAllTodoGroups(@RequestBody Map<String, Integer> body, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel response = new ResponseModel<TodoGroup>();
        List<TodoGroup> todoGroupsToReturn = new ArrayList<TodoGroup>();
        int userID = body.get("user_id");
        try {
            List<TodoGroup> todoGroups = todoGroupService.getAllTodoGroups().getEntities();
            List<Todo> todos = todoService.getAllTodos().getEntities();

            for (TodoGroup todoGroup : todoGroups) {
                if (todoGroup.getUser_id() == userID) {
                    for (Todo todo : todos) {
                        if (todo.getGroup_id() == todoGroup.getId()) {
                            if (todoGroup.getTodos() == null) {
                                todoGroup.setTodos(new ArrayList<Todo>());
                            }
                            todoGroup.getTodos().add(todo);
                        }
                    }
                    todoGroupsToReturn.add(todoGroup);
                }
            }
            response.setEntities(todoGroupsToReturn);
            return response;
        } catch (Exception ex) {
            response.setHasError(true);
            response.setErrorMessage(ex.getMessage());
            return response;
        }
    }

    @RequestMapping(value = "/todo-groups/{id}", method = RequestMethod.GET)
    public ResponseModel<TodoGroup> getTodoGroupById(@PathVariable("id") int id, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<TodoGroup> response = todoGroupService.getTodoGroupById(id);
        return response;
    }

    @RequestMapping(value = "/todo-groups/insert", method = RequestMethod.POST)
    public ResponseModel<TodoGroup> insertTodoGroup(@RequestBody TodoGroup todoGroup, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<TodoGroup> response = todoGroupService.insertTodoGroup(todoGroup);
        return response;
    }

    @RequestMapping(value = "/todo-groups/update", method = RequestMethod.PUT)
    public ResponseModel<TodoGroup> updateTodoGroup(@RequestBody TodoGroup todoGroup, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        ResponseModel<TodoGroup> response = todoGroupService.updateTodoGroup(todoGroup);
        return response;
    }

    @RequestMapping(value = "/todo-groups/delete/{id}", method = RequestMethod.DELETE)
    public ResponseModel<TodoGroup> deleteTodo(@PathVariable("id") int id, HttpServletRequest request) {
        boolean isAuthorized = isAuthorized(request);

        if (isAuthorized == false) {
            return getUnAuthorizedResponse();
        }

        List<Todo> todos = todoService.getAllTodos().getEntities();

        for (Todo todo : todos) {
            if (todo.getGroup_id() == id) {
                todoService.deleteTodo(todo.getId());
            }
        }

        ResponseModel<TodoGroup> response = todoGroupService.deleteTodoGroup(id);
        return response;
    }

    public boolean isAuthorized(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token = authorization.substring(7);

        List<User> users = userService.getAllUsers().getEntities();
        boolean loggedIn = false;

        for (User user : users) {
            if (token.equals(user.getToken())) {
                loggedIn = true;
            }
        }
        return loggedIn;
    }

    public ResponseModel getUnAuthorizedResponse() {
        ResponseModel response = new ResponseModel();
        response.setHasError(true);
        response.setErrorMessage("You are not logged in");
        return response;
    }
}
