import { Component, OnInit } from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {Router} from "@angular/router";
import {ConversionService} from "../../../services/conversion.service";
import {JwtHelper,tokenNotExpired} from 'angular2-jwt';
import {auth0ClientId, auth0Domain} from "../../lib/consts";
declare var Auth0Lock:any;
import * as $ from 'jquery';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  //Auth0 properties
  authOptions = {
    auth: {
    responseType: 'token',
    params: {scope: 'openid nickname'}
    },
    usernameStyle: 'username'
  };
  //lock = new Auth0Lock(auth0ClientId,auth0Domain,this.authOptions);
  //jwtHelper = new JwtHelper();
  isPrivate;

  public globalStatistics;



  constructor(private router:Router,private filterService:FilterService,private conversionService:ConversionService) {
  }

  ngOnInit() {
    this.getGlobalStatistics();
    this.listenToAuthenticated();

  }
  
  ngAfterViewInit(){
  
  console.log('my test div', $('#test'));
  this.applyStyling();
  
  }
  
  applyStyling(){
  
  
  }
  getIsPrivateUser(){
    return this.isPrivate;
  }

  private listenToAuthenticated(){

    // this.lock.on('authenticated',authresult=>{
    //   this.lock.getProfile(authresult.idToken,(error,profile)=>{
    //
    //     if(error) throw new Error(error);
    //     //store the auth results to local storage.
    //     localStorage.setItem('profile',JSON.stringify(profile));
    //     localStorage.setItem('id_token',JSON.stringify(authresult.idToken));
    //
    //     //console.log('profile',profile);
    //
    //     //redirect the user after auth
    //     console.log('login as private',this.isPrivate);
    //     if(this.getIsPrivateUser())
    //       this.router.navigate(['user',profile.nickname,'profile']);
    //     else this.router.navigate(['user',profile.nickname,'search']);
    //
    //
    //   });
    // });
  }

  private getGlobalStatistics(){
    this.filterService.getGlobalStatistics().subscribe(data=>{
      this.globalStatistics = data;
    },error=>console.log('error in getting global statistics',error));
  }

  mock_login(){
    //this.router.navigate(['/user',this.mockUserId]);
  }

  mock_login_public(){
    //this.router.navigate(['/search']);
  }

  optimizeDistanceFunny(distance:number)
  {
    return this.conversionService.optimizeDistanceFunny(distance);
  }

  optimizeDistance(distance:number)
  {
    let ret = this.conversionService.optimizeDistance(distance);
    return ret.distance + " " + ret.unit;

  }

  optimizeDurationFunny(duration:number)
  {
    return this.conversionService.optimizeDurationFunny(duration);
  }

  login(isPrivate){
    this.isPrivate = isPrivate;
    //auth is disabled for now.
    //this.lock.show();

    //mock login starts here..
    let mockUserId = "a21b56c1-6d28-4ef4-aa9d-1e75f54f61ef";
    if(isPrivate)
      this.router.navigate(['user',mockUserId,'profile']);
    else
      this.router.navigate(['user',mockUserId,'search']);

  }
  logout(){
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.router.navigate(['']);

  }

  loggedIn(){
    return tokenNotExpired();
  }


}
