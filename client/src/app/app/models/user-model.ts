import { TodoGroupModel } from './todo-group-model';

export class UserModel {
    private static readonly kID: string = "id";
    private static readonly kName: string = "name";
    private static readonly kUsername: string = "username";
    private static readonly kPassword: string = "password";
    private static readonly kToken: string = "token";
    private static readonly kTodoGroups: string = "todoGroups";

    id: number;
    name: string;
    username: string;
    password: string;
    token: string;
    todoGroups: TodoGroupModel[];

    constructor(element = undefined) {

        if (element)
            this.parse(element);
    }

    parse(element) {
        // super.parse(element);
        this.id = element[UserModel.kID];
        this.name = element[UserModel.kName];
        this.username = element[UserModel.kUsername];
        this.password = element[UserModel.kPassword];
        this.token = element[UserModel.kToken];
        this.todoGroups = element[UserModel.kTodoGroups];
    }

    postDataRepresentation() {
        const item = new Object();
        item[UserModel.kID] = this.id;
        item[UserModel.kName] = this.name;
        item[UserModel.kUsername] = this.username;
        item[UserModel.kPassword] = this.password;
        item[UserModel.kToken] = this.token;
        item[UserModel.kTodoGroups] = this.todoGroups;
        return item;
    }
}