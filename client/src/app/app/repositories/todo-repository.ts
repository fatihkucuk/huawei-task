
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from './base-repository';
import { SearchCriteria } from '../search-criteria';
import { Dictionary } from '../helpers/dictionary';
import { TodoModel } from '../models/todo-model';

@Injectable()
export class TodoRepository extends BaseRepository<TodoModel> {

    constructor(public http: HttpClient) { super(TodoModel, http, 'todos') }

}
