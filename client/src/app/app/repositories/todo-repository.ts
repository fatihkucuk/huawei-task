
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from './base-repository';
import { SearchCriteria } from '../search-criteria';
import { Dictionary } from '../helpers/dictionary';
import { TodoModel } from '../models/todo-model';

@Injectable()
export class TodoRepository extends BaseRepository<TodoModel> {

    constructor(public http: HttpClient) { super(TodoModel, http, 'todos') }

    getByGroup(groupID: number, filter: SearchCriteria[] = undefined, sort: Dictionary = undefined) {
        var data = {}
        this.applyCriteria(data, filter, sort);
        return this.genericPost('todo-groups/' + groupID + '/todos', data);
    }

}
