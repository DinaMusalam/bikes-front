/**
 * Created by Python on 7/14/2016.
 */
import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";



export class Service{
    constructor(){}
    
    protected extractData(response:Response){
            return response.json()||{};
        }
    protected handleError(error:any){
            console.log('error in service',error);
            return Observable.throw(error);
        }
}
