import { BaseModel } from './base-model';

export class Message {
    private static readonly kError: string = "error";
    private static readonly kUserMessage: string = "userMessage"

    error: string;
    userMessage: string;

    static parse(element) {
        var item = new Message();
        item.error = element[Message.kError];
        item.userMessage = element[Message.kUserMessage];
        return item;
    }

    static parseList(objects) {
        let items = new Array<Message>()
        objects.forEach(element => {
            items.push(Message.parse(element))
        });
        return items
    }
}

export class Error {
    private static readonly kType: string = "type";
    private static readonly kCode: string = "code";
    private static readonly kMessages: string = "messages"

    type: number;
    messages: Message[];
    code: string;

    static parse(element) {
        var item = new Error();

        item.type = element[Error.kType];
        item.code = element[Error.kCode]
        var messages = element[Error.kMessages];
        if (messages !== undefined) {
            item.messages = Message.parseList(messages);
        }

        return item;
    }

    static parseList(objects) {
        let items = new Array<Error>()
        objects.forEach(element => {
            items.push(Error.parse(element))
        });
        return items
    }
}

export interface NoParamConstructor<T> {
    new(): T;
}

export class ResponseModel<T> {
    private static readonly kDatabaseVersion: string = "databaseVersion";
    private static readonly kEntities: string = "entities"
    private static readonly kEntity: string = "entity"
    private static readonly kCount: string = "count"
    private static readonly kUpdaters: string = "updaters"
    private static readonly kErrors: string = "errors"
    private static readonly kUserDefinedFilters: string = "userDefinedFilters"
    private static readonly kDataTableOptions: string = "dataTableOptions"
    private static readonly kComponents: string = "c"

    constructor(private ctor: NoParamConstructor<T>, element = undefined) {
        if (element)
            this.parse(element);
    }

    parse(element: Object) {

        this.count = element[ResponseModel.kCount];
        this.updaters = element[ResponseModel.kUpdaters];
        this.c = element[ResponseModel.kComponents];

        var entities = element[ResponseModel.kEntities];
        if (entities !== undefined) {
            this.entities = this.parseList(entities);
        }

        var entity = element[ResponseModel.kEntity];
        if (entity !== undefined) {
            if (this.ctor) {
                var item = new this.ctor();
                if (item instanceof BaseModel)
                    item.parse(entity);
                this.entity = item;
            }
            else {
                this.entity = entity as T;
            }
        }

        var errors = element[ResponseModel.kErrors];
        if (errors !== undefined) {
            this.errors = Error.parseList(errors);
        }

    }

    entities: Array<T>;
    count: number;
    entity: T;
    updaters: any;
    errors: Error[];

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


    hasError() {
        if (this.errors === undefined) { return false; }

        return this.errors.length > 0;
    }

    getFirstErrorMessage(): string {
        if (this.errors === undefined || this.errors.length === 0) { return ''; }
        const error = this.errors[0];
        if (error.messages === undefined || error.messages.length === 0) { return ''; }

        return error.messages[0].userMessage;
    }

    getErrorCode(): string {
        if (this.errors === undefined || this.errors.length === 0) { return ''; }
        const error = this.errors[0];
        if (error.code === undefined || error.code.length === 0) { return ''; }

        return error.code;
    }

    getWrappedErrorMessages(messagePrefix: string, messagePostfix: string, prefix: string = '', postfix: string = '') {
        if (this.errors === undefined || this.errors.length === 0) { return ''; }
        let messageString = prefix;
        this.errors.forEach(error => {
            if (error.messages === undefined || error.messages.length === 0) { return ''; }

            error.messages.forEach(message => {
                messageString = messagePrefix + message.userMessage + messagePostfix;
            });
        });
        return messageString + postfix;
    }

}
