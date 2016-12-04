import {Component, OnInit, Input} from '@angular/core';
import {ConversionService} from "../../../services/conversion.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()userStatistics;
  @Input()userInfo;


  constructor(private conversionService:ConversionService) { }

  ngOnInit() {
  }

  optimizeDistance(distance:number){
    let ret = this.conversionService.optimizeDistance(distance);
    return ret.distance + " " + ret.unit;
  }

  humanizeDuration(_duration:number) {
    let duration =  this.conversionService.humanizeDuration(_duration);
    return duration.value +' '+ duration.unit;
  }

}
