package com.example.demo.repository;

import com.example.demo.entity.TodoGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("todoGroupRepository")

public interface TodoGroupRepository extends JpaRepository<TodoGroup,Integer> {
}
