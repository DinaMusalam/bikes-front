import {Component, OnInit, Input} from '@angular/core';
import {ConversionService} from "../../../services/conversion.service";

@Component({
  selector: 'report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    @Input() data:any[];
    @Input() columns:{'title':string,dataKey:string,'unit':string}[];


    constructor( private conversionService:ConversionService) { }

    ngOnInit() {
    }

    toKm(distance:number) {
        return this.conversionService.toKM(distance);

    }

    dateFormat(date:string){
        return this.conversionService.format(date,"DD-MMM-YYYY");
    }
    toHours(_duration:number){
        return  this.conversionService.toHours(_duration);
    }

}
