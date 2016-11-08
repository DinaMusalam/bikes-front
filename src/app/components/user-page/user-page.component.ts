import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {TripService} from "../../../services/trip.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  id;
  userInfo;
  userContributions:any[];
  selectedContribution;

  constructor(private route:ActivatedRoute,private userService:UserService,private tripService:TripService) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.userService.getUserInfo(this.id).subscribe(data=>{
        console.log('user info',data);
        this.userInfo = data;
        this.getUserContributions();
      },error=>console.log('error in user info',error));

    });
  }

  private getUserContributions(){
    this.userService.getUserContributions(this.id).subscribe(data=>{
      this.userContributions = data;
    },error=>console.log('error in user info',error));
  }

  getContributionDetails(conId){
    this.tripService.getTripDetails(conId).subscribe(data=>{
      this.selectedContribution = data;
    },error=>console.log('error in trip info',error));
  }

}
