import { TodoGroupModel } from './todo-group-model';
import { BaseModel } from './base-model';

export class TodoModel extends BaseModel {

    private static readonly kID: string = "id";
    private static readonly kName: string = "name";
    private static readonly kDescription: string = "description";
    private static readonly kDeadline: string = "deadline";
    private static readonly kStatus: string = "status";
    private static readonly kGroupID: string = "groupID";
    private static readonly kGroup: string = "group";
    private static readonly kDependentID: string = "dependentID";
    private static readonly kDependent: string = "dependent";

    id: number;
    name: string;
    description: string;
    deadline: Date;
    status: number;
    groupID: number;
    group: TodoGroupModel;
    dependentID: number;
    dependent: TodoModel;

    constructor(element = undefined) {
        super(element);

        if (element)
            this.parse(element);
    }

    parse(element) {
        super.parse(element);
        this.id = element[TodoModel.kID];
        this.name = element[TodoModel.kName];
        this.description = element[TodoModel.kDescription];
        this.deadline = element[TodoModel.kDeadline];
        this.status = element[TodoModel.kStatus];
        this.groupID = element[TodoModel.kGroupID];
        this.group = element[TodoModel.kGroup];
        this.dependentID = element[TodoModel.kDependentID];
        this.dependent = element[TodoModel.kDependent];
    }
}