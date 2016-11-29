import {Component, OnInit, Input, Output} from '@angular/core';
import {EventEmitter} from "@angular/common/src/facade/async";
import {ConversionService} from "../../../services/conversion.service";

@Component({
  selector: 'app-user-trips-list',
  templateUrl: './user-trips-list.component.html',
  styleUrls: ['./user-trips-list.component.css']
})
export class UserTripsListComponent implements OnInit {
  @Input()trips;
  @Output() tripSelected = new EventEmitter();

  constructor(private conversionService:ConversionService) { }

  ngOnInit() {
  }

  selectTrip(tripId){
    this.tripSelected.emit(tripId);
  }

  dateFormat(date:string)  {
    return this.conversionService.format(date,"DD-MMM-YYYY   HH:mm");
  }

}
