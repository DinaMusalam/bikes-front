/**
 * Created by Python on 11/13/2016.
 */
import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, Params} from "@angular/router";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthGuardService implements CanActivate{

    canActivate(route: ActivatedRouteSnapshot){
        let token = localStorage.getItem('id_token');
        let isFreshToken = tokenNotExpired('idToken',JSON.parse(token));
        if(!isFreshToken){
            this.router.navigate(['']);
            return false;
        }

        let nickname=this.jwtHelper.decodeToken(token).nickname;
        let passedNickname = route.params['id'];
        if(nickname!=passedNickname){
            this.router.navigate(['']);
            return false;
        }
        console.log('token not expired',isFreshToken);
        return isFreshToken;
    }


    jwtHelper = new JwtHelper();

    constructor(private router:Router) { }

}