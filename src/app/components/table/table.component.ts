import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    @Input() data:any[];
    @Input() columns:{'title':string,dataKey:string}[];


    constructor() { }

  ngOnInit() {
  }

}
