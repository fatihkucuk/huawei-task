package com.example.demo;

import com.example.demo.entity.Todo;
import com.example.demo.entity.User;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.TodoGroupService;
import com.example.demo.service.TodoService;
import com.example.demo.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {
    @Autowired
    private UserService userService;

    @Autowired
    private TodoService todoService;

    @Autowired
    private TodoGroupService todoGroupService;

    @Test
    public void insertUserTest() {
        User user = new User();
        user.setName("name test 1");
        user.setUsername("username test" + UUID.randomUUID());
        user.setPassword("123456");
        user.setToken(UUID.randomUUID().toString());
        ResponseModel<User> userResponse = userService.insertUser(user);
        Assert.assertTrue(userResponse.getHasError() != true);
    }

    @Test
    public void getAllTodosTest() {
        ResponseModel<Todo> response = todoService.getAllTodos();
        Assert.assertTrue(response.getHasError() != true);
    }

    @Test
    public void deleteTodoTest() {
        List<Todo> todos = todoService.getAllTodos().getEntities();
        Todo firstTodo = todos.get(0);
        if (firstTodo != null) {
            int todoID = firstTodo.getId();
            ResponseModel<Todo> response = todoService.deleteTodo(todoID);
            Assert.assertTrue(response.getHasError() != true);
        }
    }
}
