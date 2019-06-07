import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { RepositoryConfig } from "./repository-config";

import { SearchCriteria } from '../search-criteria';
import { Dictionary } from '../helpers/dictionary';
import { LocalStorageHandler } from '../helpers/local-storage-handler';
import { ResponseModel, NoParamConstructor } from '../models/response-model';
import { TodoGroupModel } from '../models/todo-group-model';
import { TodoModel } from '../models/todo-model';
import { UserModel } from '../models/user-model';

@Injectable()
export class BaseRepository<T> {
    public apiRoot = RepositoryConfig.baseURL;

    constructor(private ctor: NoParamConstructor<T>, public http: HttpClient = undefined, private apiPath: string = undefined) {

    }

    genericPost(path: string, data: any) {
        return this.http
            .post(this.apiRoot + path, JSON.stringify(data), { headers: this.defaultHeaders() }).toPromise()
            .then(res => {
                return new ResponseModel<T>(this.ctor, res);
            })
            .catch(this.handleError);
    }

    genericPut(path: string, data: any) {
        return this.http
            .put(this.apiRoot + path, JSON.stringify(data), { headers: this.defaultHeaders() }).toPromise()
            .then(res => {
                return new ResponseModel<T>(this.ctor, res);
            })
            .catch(this.handleError);
    }

    genericDelete(path: string, data: any) {
        return this.http
            .delete(this.apiRoot + path).toPromise()
            .then(res => {
                return new ResponseModel<T>(this.ctor, res);
            })
            .catch(this.handleError);
    }

    getAll(filter: SearchCriteria[] = undefined, sort: Dictionary = undefined) {
        var path = this.apiPath + '/list';
        var data = {}
        this.applyCriteria(data, filter, sort);
        return this.genericPost(path, data);
    }

    post(item: T) {
        let data = this.asPostDataRepresentation(item);
        return this.genericPost(this.apiPath + '/insert', data);
    }

    asPostDataRepresentation(item: T) {
        let data = {};
        if (item instanceof TodoGroupModel)
            data = item.postDataRepresentation();
        else if (item instanceof TodoModel)
            data = item.postDataRepresentation();
        else if (item instanceof UserModel)
            data = item.postDataRepresentation();

        return data;
    }

    put(item: T) {
        let data = this.asPostDataRepresentation(item);
        return this.genericPut(this.apiPath + '/update', data);
    }

    delete(id: number) {
        return this.genericDelete(this.apiPath + '/delete/' + id, undefined);
    }

    get(id: number) {
        var data = { Identifier: id }
        this.applyCriteria(data, undefined, undefined);
        return this.genericPost(this.apiPath + '/get', data);
    }

    handleError(error: any) {
        return Promise.reject(error.message || error);
    }

    defaultHeaders() {
        const token = LocalStorageHandler.getToken();
        if (token === undefined && token === null) {
            return new HttpHeaders()
                .set("Content-Type", "application/json")
                .set("Application", "HUAWEI.TASK")
                .set("Accept-Language", "en");
        } else {
            return new HttpHeaders()
                .set("Content-Type", "application/json")
                .set("Application", "HUAWEI.TASK")
                .set("Authorization", "Bearer " + token)
                .set("Accept-Language", "en");
        }
    }

    applyCriteria(
        data: Object,
        filter: SearchCriteria[] = undefined,
        sort: Dictionary = undefined
    ) {

        if (filter !== undefined && filter !== null && filter.length > 0) {
            const searchCriterias = new Array();
            filter.forEach(element => {
                const criteria = new Object();
                criteria["key"] = element.key;
                criteria["keys"] = element.keys;
                criteria["value"] = element.value;
                if (element.value instanceof Array) {
                    criteria["value"] = element.value;
                } else {
                    criteria["value"] = Array.of(element.value);
                }
                criteria["operator"] = element.operator;

                searchCriterias.push(criteria);
            });
            data["searchCriterias"] = searchCriterias;
        }

        if (sort !== undefined && sort !== null && !sort.isEmpty()) {
            const sortCriterias = new Array();
            sort.keys().forEach(element => {
                const criteria = new Object();
                criteria["key"] = element;
                if (sort[element] === 0) {
                    criteria["ascending"] = true;
                } else {
                    criteria["ascending"] = false;
                }

                sortCriterias.push(criteria);
            });
            data["sortCriterias"] = sortCriterias;
        }
        return data;
    }
}
