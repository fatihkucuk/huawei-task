import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoGroupModel } from '../../models/todo-group-model';
import { TodoModel } from '../../models/todo-model';
import { PageMode } from '../../enums/page-mode-enum';
import { BaseComponent } from '../base-component';
import { TodoGroupRepository } from '../../repositories/todo-group-repository';
import { LocalStorageHandler } from '../../helpers/local-storage-handler';
import { TodoRepository } from '../../repositories/todo-repository';
import { TodoStatus } from '../../enums/todo-status-enum';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  providers: [TodoGroupRepository]
})
export class ToDoListComponent extends BaseComponent implements OnInit {
  pageMode: PageMode = PageMode.List;
  todoGroups = new Array<TodoGroupModel>();
  todoGroup = new TodoGroupModel();
  todoModel = new TodoModel();
  constructor(private todoGroupRepo: TodoGroupRepository, private todoRepo: TodoRepository) {
    super();
  }

  ngOnInit() {
    let todoGroup = new TodoGroupModel();
    todoGroup.id = 1;
    todoGroup.name = "School";

    let todo = new TodoModel();
    todo.id = 1;
    todo.name = "Math Homework";
    todo.description = "Math work book page 186-190 Math work book page 186-190 Math work book Math work book page 186-190 Math work book page 186-190 page 186-190 Math work book page 186-190";
    todo.deadline = new Date();
    todo.status = 0;
    todoGroup.todos = new Array<TodoModel>();
    todoGroup.todos.push(todo);

    this.todoGroups.push(todoGroup);

    todo = new TodoModel();
    todo.id = 2;
    todo.name = "Chemistry Homework";
    todo.description = "Chemistry work book page 2-6";
    todo.deadline = new Date();
    todo.status = 1;
    todoGroup.todos.push(todo);

    this.todoGroups.push(todoGroup);

    todoGroup = new TodoGroupModel();
    todoGroup.id = 2;
    todoGroup.name = "Work";

    todo = new TodoModel();
    todo.id = 2;
    todo.name = "List-Detail Components";
    todo.description = "Generate List-Detail Component with routing";
    todo.deadline = new Date();
    todo.status = 0;
    todoGroup.todos = new Array<TodoModel>();
    todoGroup.todos.push(todo);

    this.todoGroups.push(todoGroup);

    todoGroup = new TodoGroupModel();
    todoGroup.id = 3;
    todoGroup.name = "Social";
    this.todoGroups.push(todoGroup);

    this.activeTodoGroup = this.todoGroups[0];

    this.getTodoGroupsByUser();
  }

  userID: number;
  getTodoGroupsByUser() {
    this.userID = +LocalStorageHandler.getUserID();
    if (!this.userID) {
      return;
    }
    this.todoGroupRepo
      .getByUser(this.userID, this.filter, this.sort)
      .then(res => {
        if (res.hasError()) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoGroups = res.entities;
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  activeTodoGroup: TodoGroupModel;
  selectedTabChanged(todoGroup) {
    this.activeTodoGroup = todoGroup;
  }

  activeTodoGroupClone: TodoGroupModel;
  groupNameChange(event: string) {
    this.activeTodoGroupClone = this.activeTodoGroup;
    this.activeTodoGroupClone.name = event;
  }

  saveTodoGroupButtonClicked() {
    if (!this.todoGroup.name) {
      this.errorMessage = "List name cannot be empty";
      return;
    }
    this.insertTodoGroup();
  }

  saveTodoButtonClicked() {
    this.todoModel.groupID = this.activeTodoGroup.id;
    //TODO: arrange todo.status on backend 
    this.todoModel.name
    if (!this.todoModel.name) {
      this.errorMessage = "Name cannot be empty";
      return;
    }
    if (!this.todoModel.description) {
      this.errorMessage = "Description cannot be empty";
      return;
    }
    if (!this.todoModel.deadline) {
      this.errorMessage = "Deadline cannot be empty";
      return;
    }

    this.insertTodo();
  }

  addTodoButtonClicked() {
    if (this.activeTodoGroup.todos == undefined) {
      this.activeTodoGroup.todos = new Array<TodoModel>();
    }
    this.todoModel = new TodoModel();
    this.activeTodoGroup.todos.push(this.todoModel);
    this.pageMode = PageMode.Insert;
  }

  cancelButtonClicked(index: number) {
    if (this.pageMode == PageMode.Insert)
      this.activeTodoGroup.todos.splice(index, 1);
    this.todoModel = new TodoModel();
    this.pageMode = PageMode.List;
  }

  insertTodoGroup() {
    this.todoGroupRepo
      .post(this.todoGroup)
      .then(res => {
        if (res.hasError()) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoGroup = res.entity;
          this.todoGroups.push(this.todoGroup);
          this.activeTodoGroup = this.todoGroup;
          this.pageMode = PageMode.List;
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  updateTodoGroupButtonClicked(activeTodoGroup: TodoGroupModel) {
    activeTodoGroup = this.activeTodoGroupClone;
    let found = this.todoGroups.find(todoGroup => todoGroup.id == activeTodoGroup.id);
    found.id = activeTodoGroup.id;
    found.name = activeTodoGroup.name;
    found.todos = activeTodoGroup.todos.slice();
  }

  deleteTodoGroupButtonClicked(activeTodoGroup: TodoGroupModel) {
    let index = this.todoGroups.indexOf(activeTodoGroup);
    if (index > -1) {
      this.todoGroups.splice(index, 1);
      this.activeTodoGroup = this.todoGroups.length > 0 ? this.todoGroups[0] : undefined;
    }
  }

  insertTodo() {
    this.todoRepo
      .post(this.todoModel)
      .then(res => {
        if (res.hasError()) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoModel = res.entity;
          this.pageMode = PageMode.List;
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  updateTodoButtonClicked(todo) {
    this.todoModel = todo;
    this.pageMode = PageMode.Update;
  }

  deleteTodoButtonClicked(index: number) {
    this.activeTodoGroup.todos.splice(index, 1);
  }
}
