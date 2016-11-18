import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {TripService} from "../../../services/trip.service";
import {ConversionService} from "../../../services/conversion.service" ;
import {MapService, Feature} from "../../../services/map.service";


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
  tripCoordinates;
  //userinfo and profile are the same thing in future.
  userInfo2={
  fullName:"John Mc.Power",
  email:"john@domain.com",
  avatar:"../../../assets/cat.png",
  bio:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctioo quaerat quas quasveritatis voluptas voluptates?",
  height:182,
  weight:90,
  age:32,
  sex:'male'
};
  profile =JSON.parse(localStorage.getItem('profile'));


  //ui
  selectedTab = 'info';
  mapStyles = [{name:'dark',style:'mapbox://styles/mapbox/dark-v9',route:"#00BB44"},{name:'street',style:'mapbox://styles/mapbox/streets-v9',route:"#FF4B1C"}];
  selectedMapStyle = this.mapStyles[1];
  @ViewChild('start_marker') sMarker;
  listStart=0;
  listEnd;

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private tripService:TripService,
              private mapService:MapService,
              private conversionService:ConversionService) { }

  ngOnInit() {
    this.id = this.profile.nickname;
    this.userService.getUserInfo(this.id).subscribe(data=>{
      console.log('user info',data);
      this.userInfo = data;
      this.getUserStatistics();
    },error=>console.log('error in user info',error));
  }

  selectMapStyle(styleName:string){
    this.selectedMapStyle = this.mapStyles.filter(style=>style.name == styleName)[0];
    this.visualize();
  }

  private addRoute(coordinates){
    let source = 'route';
    this.mapService.addSource(source, {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": coordinates
        }
      }
    });
    this.mapService.addLayer({
      "id": source,
      "type": "line",
      "source": source,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": this.selectedMapStyle.route,
        "line-width": 8
      }
    });
    let feature:Feature = {
      type: "Feature",
      properties: {
        message: "Foo",
        iconSize: [60, 60]
      },
      geometry: {
        type: "Point",
        coordinates: this.tripCoordinates[0]
      }
    };
    this.mapService.addMarker(this.sMarker.nativeElement,feature);
  }
  private visualize(){
    this.mapService.createMap({
      container: 'map', // container id
      style: this.selectedMapStyle.style, //stylesheet location
      center:this.tripCoordinates[0], // starting position
      zoom: 14 // starting zoom
    });

    this.mapService.onMapLoad(()=>this.addRoute(this.tripCoordinates));
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
    this.tripService.getTripDetails(conId).subscribe(_data=>{
      this.selectedContribution = _data;
      console.log('trip details',_data);

      let data = JSON.parse(_data.st_asgeojson);
      let coordinates = data.coordinates.map(item=>[item[0],item[1]]);
      console.log('trip coords',coordinates);
      this.tripCoordinates = coordinates;
      this.visualize();

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
