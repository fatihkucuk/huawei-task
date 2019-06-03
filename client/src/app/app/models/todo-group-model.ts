import { TodoModel } from './todo-model';
import { BaseModel } from './base-model';
import { UserModel } from './user-model';

export class TodoGroupModel extends BaseModel {

    private static readonly kID: string = "id";
    private static readonly kName: string = "name";
    private static readonly kTodos: string = "todos";
    private static readonly kUserID: string = "userID";
    private static readonly kUser: string = "user";

    id: number;
    name: string;
    todos: TodoModel[];
    userID: number;
    user: UserModel;

    constructor(element = undefined) {
        super(element);

        if (element)
            this.parse(element);
    }

    parse(element) {
        super.parse(element);
        this.id = element[TodoGroupModel.kID];
        this.name = element[TodoGroupModel.kName];
        this.todos = this.parseList<TodoModel>(TodoModel, element[TodoGroupModel.kTodos]);
        this.userID = element[TodoGroupModel.kUserID];
        this.user = element[TodoGroupModel.kUser];
    }
}