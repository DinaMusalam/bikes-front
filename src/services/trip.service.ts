/**
 * Created by Python on 11/7/2016.
 */
import { Injectable } from '@angular/core';
import {Service} from "./service";
import {HttpClient} from "./http-client.service";
import {Observable} from "rxjs/Rx";
import {_API_BASE} from "../app/lib/consts";

@Injectable()
export class TripService extends Service{

    constructor(private http:HttpClient) {super(); }

    getTripDetails(conId):Observable<any>{
        let url = _API_BASE+'api/contributions/'+conId;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }


}