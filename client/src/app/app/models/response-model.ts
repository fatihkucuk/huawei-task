import { TodoGroupModel } from './todo-group-model';
import { TodoModel } from './todo-model';
import { UserModel } from './user-model';

export interface NoParamConstructor<T> {
    new(): T;
}

export class ResponseModel<T> {
    private static readonly kEntities: string = "entities"
    private static readonly kEntity: string = "entity"
    private static readonly kHasError: string = "hasError";
    private static readonly kErrorMessage: string = "errorMessage";

    constructor(private ctor: NoParamConstructor<T>, element = undefined) {
        if (element)
            this.parse(element);
    }

    parse(element: Object) {

        var entities = element[ResponseModel.kEntities];
        if (entities) {
            this.entities = this.parseList(entities);
        }

        var entity = element[ResponseModel.kEntity];
        if (entity) {
            if (this.ctor) {
                var item = new this.ctor();
                if (item instanceof TodoGroupModel)
                    item.parse(entity);
                else if (item instanceof TodoModel)
                    item.parse(entity);
                else if (item instanceof UserModel)
                    item.parse(entity);
                this.entity = item;
            }
            else {
                this.entity = entity as T;
            }
        }

        this.hasError = element[ResponseModel.kHasError];
        if (this.hasError) {
            this.errorMessage = element[ResponseModel.kErrorMessage];
        }

    }

    entities: Array<T>;
    entity: T;
    errorMessage: string;
    hasError: boolean;

    private _c: string = "";
    get c(): string {
        return this._c;
    }
    set c(theC: string) {
        this._c = theC;

    }

    parseList(objects: Object[]): T[] {
        var array = new Array<T>();
        objects.forEach(element => {
            if (this.ctor) {
                var item = new this.ctor();
                if (item instanceof TodoGroupModel)
                    item.parse(element);
                else if (item instanceof TodoModel)
                    item.parse(element);
                else if (item instanceof UserModel)
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

    getFirstErrorMessage(): string {
        if (this.hasError)
            return this.errorMessage;
        else return '';
    }

}
