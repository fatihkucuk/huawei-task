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
  providers: [TodoGroupRepository, TodoRepository]
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
    this.getTodoGroupsByUser();
  }

  userID: number;
  getTodoGroupsByUser() {
    this.userID = +LocalStorageHandler.getUserID();
    if (!this.userID) {
      return;
    }
    this.todoGroupRepo
      .getByUser(this.userID)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoGroups = res.entities;
          if (this.todoGroups != undefined && this.todoGroups.length > 0) {
            this.activeTodoGroup = this.todoGroups[0];
            this.activeTodoGroup.copyTodos = this.activeTodoGroup.todos.slice();
            this.copyTodos = this.activeTodoGroup.todos.slice();
            this.todoGroup = this.activeTodoGroup;
          }
          this.selectedTabChanged(this.todoGroups[0]);
          this.todoModel = new TodoModel();
          this.pageMode = PageMode.List;
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

  groupNameChange(event: string) {
    this.activeTodoGroup.name = event;
  }

  saveTodoGroupButtonClicked() {
    if (!this.todoGroup.name) {
      this.errorMessage = "List name cannot be empty";
      return;
    }
    this.insertTodoGroup();
  }

  saveTodoButtonClicked() {
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
    this.todoModel.group_id = this.activeTodoGroup.id;

    if (this.pageMode == PageMode.Insert) {
      this.insertTodo();
    } else if (this.pageMode == PageMode.Update) {
      this.updateTodo();
    }
  }

  arrangeStatus(deadline: Date, status: number) {
    let now = new Date();
    deadline = new Date(deadline);
    if (deadline.getTime() < now.getTime()) {
      status = TodoStatus.Expired;
    } else {
      status = TodoStatus.NotCompleted;
    }
    return status;
  }

  insertTodo() {
    this.todoModel.group_id = this.activeTodoGroup.id;
    this.todoModel.id = undefined;
    // if (!this.todoModel.status)
    this.todoModel.status = this.arrangeStatus(this.todoModel.deadline, this.todoModel.status);

    this.todoRepo
      .post(this.todoModel)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoModel = res.entity;
          this.getTodoGroupsByUser();
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
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
    this.todoGroup.user_id = this.userID;
    this.todoGroup.id = undefined;
    this.todoGroupRepo
      .post(this.todoGroup)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoGroup = res.entity;
          this.getTodoGroupsByUser();
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  updateTodoGroupButtonClicked(activeTodoGroup: TodoGroupModel) {
    this.updateTodoGroup();
  }

  updateTodoGroup() {
    this.todoGroup.user_id = this.userID;
    this.todoGroup.name = this.activeTodoGroup.name;
    this.todoGroup.id = this.activeTodoGroup.id;
    this.todoGroupRepo
      .put(this.todoGroup)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoGroup = res.entity;
          this.getTodoGroupsByUser();
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  deleteTodoGroupButtonClicked(activeTodoGroup: TodoGroupModel) {
    this.deleteTodoGroup();
  }

  deleteTodoGroup() {
    this.todoGroup.id = this.activeTodoGroup.id;
    this.todoGroupRepo
      .delete(this.todoGroup.id)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          let index = this.todoGroups.indexOf(this.activeTodoGroup);
          if (index > -1) {
            this.todoGroups.splice(index, 1);
            this.activeTodoGroup = this.todoGroups.length > 0 ? this.todoGroups[0] : undefined;
          }
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

  updateTodo(arrangeStatus: boolean = true) {
    this.todoModel.group_id = this.activeTodoGroup.id;
    if (arrangeStatus)
      this.todoModel.status = this.arrangeStatus(this.todoModel.deadline, this.todoModel.status);

    this.todoRepo
      .put(this.todoModel)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.todoModel = res.entity;
          this.getTodoGroupsByUser();
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  deleteTodo(todo: TodoModel, index: number) {
    let ind = index;
    this.todoRepo
      .delete(todo.id)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.activeTodoGroup.todos.splice(ind, 1);
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  statusChanged(todo: TodoModel, event: boolean) {
    todo.isCompleted = event;
    if (event == true) {
      todo.status = TodoStatus.Completed;
    } else if (event == false) {
      todo.status = TodoStatus.NotCompleted;
    }
    this.todoModel = todo;
    this.updateTodo(false);
  }

  copyTodos: TodoModel[];
  nameFilter: string;
  statusFilter: string;
  filterChanged(nameFilter: string = undefined, statusFilter: string = undefined) {
    if (statusFilter == "undefined") {
      statusFilter = undefined
    }
    let notFiltered = false;
    this.activeTodoGroup.todos = this.copyTodos.filter(todo => {
      if (nameFilter && !statusFilter)
        return todo.name.toLowerCase().includes(nameFilter.toLowerCase())
      else if (!nameFilter && statusFilter)
        return todo.status == +statusFilter
      else if (nameFilter && statusFilter)
        return todo.name.toLowerCase().includes(nameFilter.toLowerCase()) && todo.status == +statusFilter
      else if (!nameFilter && !statusFilter) {
        notFiltered = true;
        return this.copyTodos;
      }
    });
    if (notFiltered)
      this.activeTodoGroup.todos = this.copyTodos;
  }

  sortType: string;
  sortStrategy: string;
  sortTypeChanged(sortType: string) {

  }

  sortStrategyChanged(sortStrategy: string) {

  }
}
