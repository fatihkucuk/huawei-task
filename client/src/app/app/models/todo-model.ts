import { TodoGroupModel } from './todo-group-model';
import { TodoStatus } from '../enums/todo-status-enum';

export class TodoModel {

    private static readonly kID: string = "id";
    private static readonly kName: string = "name";
    private static readonly kDescription: string = "description";
    private static readonly kDeadline: string = "deadline";
    private static readonly kStatus: string = "status";
    private static readonly kGroup_id: string = "group_id";
    private static readonly kGroup: string = "group";
    private static readonly kDependentID: string = "dependentID";
    private static readonly kDependent: string = "dependent";

    id: number;
    name: string;
    description: string;
    deadline: Date;
    status: number;
    group_id: number;
    group: TodoGroupModel;
    dependent_id: number;
    dependent: TodoModel;

    constructor(element = undefined) {

        if (element)
            this.parse(element);
    }

    parse(element) {
        // super.parse(element);
        this.id = element[TodoModel.kID];
        this.name = element[TodoModel.kName];
        this.description = element[TodoModel.kDescription];
        this.deadline = element[TodoModel.kDeadline];
        this.status = element[TodoModel.kStatus];
        this.group_id = element[TodoModel.kGroup_id];
        this.group = element[TodoModel.kGroup];
        this.dependent_id = element[TodoModel.kDependentID];
        this.dependent = element[TodoModel.kDependent];
    }

    postDataRepresentation() {
        const item = new Object();
        item[TodoModel.kID] = this.id;
        item[TodoModel.kName] = this.name;
        item[TodoModel.kDescription] = this.description;
        item[TodoModel.kDeadline] = this.deadline;
        item[TodoModel.kStatus] = this.status;
        item[TodoModel.kGroup_id] = this.group_id;
        item[TodoModel.kDependentID] = this.dependent_id;

        return item;
    }


    private _statusText: string;
    public get statusText(): string {
        if (this.status == TodoStatus.Expired) {
            this._statusText = "Expired";
        }
        else if (this.status == TodoStatus.Completed) {
            this._statusText = "Completed";
        }
        else if (this.status == TodoStatus.NotCompleted) {
            this._statusText = "Not Completed";
        } else {
            this._statusText = "Not Completed";
        }
        return this._statusText;
    }
    public set statusText(v: string) {
        this._statusText = v;
    }


    private _isCompleted: boolean;
    public get isCompleted(): boolean {
        if (this.status == TodoStatus.Completed) {
            this._isCompleted = true;
        } else if (this.status == TodoStatus.NotCompleted) {
            this._isCompleted = false;
        }
        return this._isCompleted;
    }
    public set isCompleted(v: boolean) {
        this._isCompleted = v;
    }


}