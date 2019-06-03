export class SearchCriteria {
    key?: string
    keys?: string[]
    operator?: string
    exclude?: boolean
    value?: any

    constructor(key: string = undefined, value: any = undefined, operator: string = undefined) {
        this.key = key;
        this.value = [value];
    }

    public static CreateList(key: string, value: any = undefined, operator: string = undefined): SearchCriteria[] {
        var list = new Array<SearchCriteria>();
        var criteria = new SearchCriteria(key, [value]);
        criteria.operator = operator;
        list.push(criteria);
        return list;
    }

}
