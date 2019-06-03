interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];

    isEmpty(): boolean;
}

export class Dictionary {

    _keys: string[] = new Array<string>();
    _values: any[] = new Array<any>();

    constructor(init: { key: string; value: any; }[] = undefined) {
        if (init == null || init == undefined) { return; }
        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    isEmpty() {
        return this._keys.length == 0;
    }

    add(key: string, value: any) {

        var index = this._keys.indexOf(value);
        if (index > -1) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            delete this[key];
        }

        this[key] = value;
        this._keys.push(key);
        this._values.push(value);

    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys;
    }

    values(): any[] {
        return this._values;
    }

    containsKey(key: string) {
        return this._keys.indexOf(key) > -1;
    }

    clone(): Dictionary {
        var copy = new Dictionary();
        copy._keys = new Array<string>(...this._keys);
        copy._values = new Array<any>();
        this._values.forEach(element => {
            copy._values.push(element);
        });

        this._keys.forEach(element => {
            copy[element] = this[element];
        });

        return copy;
    }

    toLookup(): IDictionary {
        return this;
    }
}