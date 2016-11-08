/**
 * Created by Python on 10/29/2016.
 */
import { Injectable } from '@angular/core';
import {HttpClient} from "./http-client.service";
import {Service} from "./service";
import {Observable} from "rxjs/Rx";
import {_API_BASE} from "../app/lib/consts";
import {FilterOptions} from "../app/lib/my_lib-d";

@Injectable()
export class FilterService extends Service{

    constructor(private http:HttpClient) {super(); }

    getCountries():Observable<any>{
        let url = _API_BASE+'api/countries';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCities(countryId):Observable<any>{
        let url = _API_BASE+'api/countries/'+countryId+'/cities';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCity(cityId):Observable<any>{
        let url = _API_BASE+'api/cities/'+cityId;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCityStatistics(cityId):Observable<any>{
        let url = _API_BASE+'api/cities/'+cityId+'/statistics';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getGlobalStatistics():Observable<any>{
        let url = _API_BASE+'api/global/statistics';
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getData(data:FilterOptions):Observable<any>{
        let url = _API_BASE+'api/cities/'+data.cityId+'/filter2/'
            +data.timeStarted+'/'+data.timeEnded+'/'+data.timeResolution;
        console.log('filter url', url);
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }


}