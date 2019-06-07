package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity()
@Table(name = "todo", schema = "public")
public class Todo {

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getGroup_id() {
        return group_id;
    }

    public void setGroup_id(int group_id) {
        this.group_id = group_id;
    }

    public TodoGroup getGroup() {
        return group;
    }

    public void setGroup(TodoGroup group) {
        this.group = group;
    }

    public int getDependent_id() {
        return dependent_id;
    }

    public void setDependent_id(Integer dependent_id) {
        this.dependent_id = dependent_id;
    }

    public Todo getDependent() {
        return dependent;
    }

    public void setDependent(Todo dependent) {
        this.dependent = dependent;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="deadline")
    private Date deadline;

    @Column(name="status")
    private int status;

    @Column(name="group_id")
    private int group_id;

    @Transient
    private TodoGroup group;

    @JsonIgnore
    @Column(name="dependent_id", nullable = true)
    private Integer dependent_id;

    @Transient
    private Todo dependent;
}
