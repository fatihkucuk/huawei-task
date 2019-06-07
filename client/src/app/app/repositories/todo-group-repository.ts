import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from './base-repository';
import { TodoGroupModel } from '../models/todo-group-model';
import { SearchCriteria } from '../search-criteria';
import { Dictionary } from '../helpers/dictionary';

@Injectable()
export class TodoGroupRepository extends BaseRepository<TodoGroupModel> {

    constructor(public http: HttpClient) { super(TodoGroupModel, http, 'todo-groups') }

    getByUser(userID: number) {
        var data = { user_id: userID }
        return this.genericPost('/todo-groups/list', data);
    }

}
