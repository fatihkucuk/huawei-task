import { TodoModel } from './todo-model';
import { UserModel } from './user-model';
import { NoParamConstructor } from './response-model';

export class TodoGroupModel {

    private static readonly kID: string = "id";
    private static readonly kName: string = "name";
    private static readonly kTodos: string = "todos";
    private static readonly kUser_id: string = "user_id";
    private static readonly kUser: string = "user";

    id: number;
    name: string;
    todos: TodoModel[];
    user_id: number;
    user: UserModel;

    copyTodos: TodoModel[];
    constructor(element = undefined) {

        if (element)
            this.parse(element);
    }

    parse(element) {
        // super.parse(element);
        this.id = element[TodoGroupModel.kID];
        this.name = element[TodoGroupModel.kName];
        this.todos = this.parseList<TodoModel>(TodoModel, element[TodoGroupModel.kTodos]);
        this.user_id = element[TodoGroupModel.kUser_id];
        this.user = element[TodoGroupModel.kUser];
    }

    parseList<T>(ctor: NoParamConstructor<T>, objects: Object[]): T[] {
        if (objects == undefined) return undefined;

        var array = new Array<T>();
        objects.forEach(element => {
            if (ctor) {
                var item = new ctor();
                if (item instanceof TodoModel)
                    item.parse(element);
                array.push(item);
            }
            else {
                var item = element as T
                array.push(item);
            }
        });
        return array;
    }

    postDataRepresentation() {
        const item = new Object();
        item[TodoGroupModel.kID] = this.id;
        item[TodoGroupModel.kName] = this.name;
        item[TodoGroupModel.kUser_id] = this.user_id;
        return item;
    }

    clone() {
        let item = new TodoGroupModel();
        item.id = this.id;
        item.name = this.name;
        item.user_id = this.user_id;
        item.user = this.user;
        if (this.todos)
            item.todos = this.todos.slice();
        return item;
    }
}