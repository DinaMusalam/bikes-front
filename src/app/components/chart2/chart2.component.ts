import { Component, OnInit } from '@angular/core';

declare var AmCharts:any;

@Component({
  selector: 'report-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    this.makeChart();
  }

  makeChart(){
    var chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "marginRight": 70,
      "dataProvider": [{
        "country": "USA",
        "visits": 2900,
        "color": "#FF0F00"
      }, {
        "country": "China",
        "visits": 1882,
        "color": "#FF6600"
      }, {
        "country": "Japan",
        "visits": 1809,
        "color": "#FF9E01"
      }, {
        "country": "Germany",
        "visits": 1322,
        "color": "#FCD202"
      }, {
        "country": "UK",
        "visits": 1122,
        "color": "#F8FF01"
      }, {
        "country": "France",
        "visits": 1114,
        "color": "#B0DE09"
      }, {
        "country": "India",
        "visits": 984,
        "color": "#04D215"
      }, {
        "country": "Spain",
        "visits": 711,
        "color": "#0D8ECF"
      }, {
        "country": "Netherlands",
        "visits": 665,
        "color": "#0D52D1"
      }, {
        "country": "Russia",
        "visits": 580,
        "color": "#2A0CD0"
      }, {
        "country": "South Korea",
        "visits": 443,
        "color": "#8A0CCF"
      }, {
        "country": "Canada",
        "visits": 441,
        "color": "#CD0D74"
      }],
      "valueAxes": [{
        "title": "Visitors from country",
      }],
      "startDuration": 1,
      "balloon": {
        "hideBalloonTime": 1000, // 1 second
        "disableMouseEvents": false, // allow click
        "fixedPosition": true
      },
      "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]<br><a href='http://google.com/'>Google</a></b>",
        "fillColorsField": "color",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "visits"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 90
      },
      "export": {
        "enabled": true,
        "libs": {
          "path": "../libs/"
        },
        "menu": [ {
          "class": "export-main",
          "menu": [ {
            "label": "Download",
            "menu": [ "PNG", "JPG", "CSV" ]
          }, {
            "label": "Annotate",
            "action": "draw",
            "menu": [ {
              "class": "export-drawing",
              "menu": [ "PNG", "JPG" ]
            } ]
          } ]
        } ]
      }

    });
  }

}
