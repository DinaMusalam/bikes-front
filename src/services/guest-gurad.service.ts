/**
 * Created by Python on 11/13/2016.
 */
import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot, Params} from "@angular/router";
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class GuestGuardService implements CanActivate{

    canActivate(route: ActivatedRouteSnapshot){
        let token = localStorage.getItem('id_token');
        let isFreshToken = tokenNotExpired('idToken',JSON.parse(token));
        if(isFreshToken){
            return false;
        }
    }
    constructor() { }

}