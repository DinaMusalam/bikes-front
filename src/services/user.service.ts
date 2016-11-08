/**
 * Created by Python on 11/7/2016.
 */
import { Injectable } from '@angular/core';
import {Service} from "./service";
import {HttpClient} from "./http-client.service";
import {Observable} from "rxjs/Rx";
import {_API_BASE} from "../app/lib/consts";

@Injectable()
export class UserService extends Service{

    constructor(private http:HttpClient) {super(); }

    getUserInfo(userId):Observable<any>{
        let url = _API_BASE+'api/users/'+userId+'/info';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUserContributions(userId):Observable<any>{
        let url = _API_BASE+'api/users/'+userId+'/contributions';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }


}