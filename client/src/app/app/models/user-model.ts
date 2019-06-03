import { BaseModel } from './base-model';
import { TodoGroupModel } from './todo-group-model';

export class UserModel extends BaseModel {
    private static readonly kID: string = "id";
    private static readonly kName: string = "name";
    private static readonly kUserName: string = "userName";
    private static readonly kPassword: string = "password";
    private static readonly kToken: string = "token";
    private static readonly kTodoGroups: string = "todoGroups";

    id: number;
    name: string;
    userName: string;
    password: string;
    token: string;
    todoGroups: TodoGroupModel[];

    constructor(element = undefined) {
        super(element);

        if (element)
            this.parse(element);
    }

    parse(element) {
        super.parse(element);
        this.id = element[UserModel.kID];
        this.name = element[UserModel.kName];
        this.userName = element[UserModel.kUserName];
        this.password = element[UserModel.kPassword];
        this.token = element[UserModel.kToken];
        this.todoGroups = element[UserModel.kTodoGroups];
    }
}