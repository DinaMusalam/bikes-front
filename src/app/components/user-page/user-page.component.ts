import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {TripService} from "../../../services/trip.service";
import {ConversionService} from "../../../services/conversion.service" ;


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {

  id;
  userInfo;
  userRank:{rank:number;total:number};
  userContributions:any[];
  userStatistics;
  selectedContribution;
  //userinfo and profile are the same thing in future.
  userInfo2={
  fullName:"John Mc.Power",
  email:"john@domain.com",
  avatar:"../../../assets/cat.png",
  bio:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolorem ducimus earum excepturi exercitationem illo impedit ipsa iusto, non perferendis porro quaerat quas quasi quibusdam repudiandae rerum veritatis voluptas voluptates?",
  height:182,
  weight:90,
  age:32,
  sex:'male'
};
  profile =JSON.parse(localStorage.getItem('profile'));


  //ui
  listStart=0;
  listEnd;

  constructor(private route:ActivatedRoute,private userService:UserService,private tripService:TripService,private conversionService:ConversionService) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.userService.getUserInfo(this.id).subscribe(data=>{
        console.log('user info',data);
        this.userInfo = data;
        this.getUserStatistics();
      },error=>console.log('error in user info',error));

    });
  }

  private getUserContributions(){
    this.userService.getUserContributions(this.id).subscribe(data=>{
      this.userContributions = data;
      this.getContributionDetails(data[0].contribution_id);
    },error=>console.log('error in user info',error));
  }

  private getUserStatistics(){
    this.userService.getUserStatistics(this.id).subscribe(data=>{
      this.userStatistics = data;
      //todo use observable chain instead.
      this.getUserRank();
      this.getUserContributions();
    },error=>console.log('error in user Statisitics',error));
  }

  private getUserRank(){
    this.userService.getUserRank(this.id).subscribe(data=>{
      this.userRank = data;
    },error=>console.log('error in user Rank',error));
  }

  getContributionDetails(conId){
    this.tripService.getTripDetails(conId).subscribe(data=>{
      this.selectedContribution = data;
    },error=>console.log('error in trip info',error));
  }

  toKM(num_value:number)
  {
    return this.conversionService.toKM(num_value);
  }
  toCO2(num_value:number)
  {
    return this.conversionService.toCO2(num_value);
  }

  optimizeDistance(distance:number)
  {
    let ret = this.conversionService.optimizeDistance(distance);
    return ret.distance + " " + ret.unit;
  }
  dateFormat(date:string)
  {
    return this.conversionService.format(date,"DD-MMM-YYYY   HH:mm");
  }
  humanizeDuration(_duration:number)
  {
    let duration =  this.conversionService.humanizeDuration(_duration);
    return duration.value +' '+ duration.unit;
  }
}
