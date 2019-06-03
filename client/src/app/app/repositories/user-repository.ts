
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from './base-repository';
import { TodoGroupModel } from '../models/todo-group-model';
import { SearchCriteria } from '../search-criteria';
import { Dictionary } from '../helpers/dictionary';
import { UserModel } from '../models/user-model';

@Injectable()
export class UserRepository extends BaseRepository<UserModel> {

    constructor(public http: HttpClient) { super(UserModel, http, 'users') }

    login(user: UserModel) {
        var data = { user: user }
        return this.genericPost('users/login', data);
    }

    signup(user: UserModel) {
        var data = { user: user }
        return this.genericPost('users/signup', data);
    }
}
