import { NoParamConstructor } from './response-model';

export class BaseModel {

    private static readonly kRowguid: string = 'rowguid';
    private static readonly kCreatedAt: string = 'createdAt';
    private static readonly kCreator = 'creator';
    private static readonly kCreatedBy = 'createdBy';
    private static readonly kUpdatedAt = 'updatedAt';
    private static readonly kUpdatedBy = 'updatedBy';
    private static readonly kUpdater = 'updater';

    id: number;
    rowguid: string;
    createdAt: Date;
    createdBy: string;
    creator: string;
    updatedAt: Date;
    updatedBy: string;
    updater: string;
    _selected: boolean;

    constructor(element = undefined) {
        if (element)
            this.parse(element);
    }

    parse(element) {
        this.rowguid = element[BaseModel.kRowguid];
        this.creator = element[BaseModel.kCreator];
        this.createdBy = element[BaseModel.kCreatedBy];
        this.updatedBy = element[BaseModel.kUpdatedBy];
        this.updater = element[BaseModel.kUpdater];

        if (element[BaseModel.kCreatedAt])
            this.createdAt = new Date(element[BaseModel.kCreatedAt]);
        if (element[BaseModel.kUpdatedAt])
            this.updatedAt = new Date(element[BaseModel.kUpdatedAt]);

    }

    static parse(element) {
        const item = new BaseModel();
        item.parse(element);
        return item;
    }

    parseList<T>(ctor: NoParamConstructor<T>, objects: Object[]): T[] {
        if (objects == undefined) return undefined;

        var array = new Array<T>();
        objects.forEach(element => {
            if (ctor) {
                var item = new ctor();
                if (item instanceof BaseModel)
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
        item[BaseModel.kRowguid] = this.rowguid;
        item[BaseModel.kCreatedAt] = this.createdAt;
        item[BaseModel.kCreator] = this.creator;
        item[BaseModel.kCreatedBy] = this.createdBy;
        item[BaseModel.kUpdatedAt] = this.updatedAt;
        item[BaseModel.kUpdatedBy] = this.updatedBy;
        item[BaseModel.kUpdater] = this.updater;
        return item;
    }
}

