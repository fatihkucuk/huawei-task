package com.example.demo.entity;

import org.hibernate.validator.constraints.SafeHtml;

import javax.persistence.*;
import java.util.List;

@Entity(name="todo_group")
@Table(name = "todo_group", schema = "public")
@SecondaryTable(name="user", schema = "public")
public class TodoGroup{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name="name")
    private String name;

    @Column(name="user_id")
    private int user_id;

    @Transient
    private User user;

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        this.todos = todos;
    }

    @Transient
    private List<Todo> todos;


}
