import {Component, Input, SimpleChange, SimpleChanges} from '@angular/core';

declare var AmCharts : any;


@Component({
  selector: 'report-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent  {
  @Input() data;
  @Input() axisUnit;
  chart;

  constructor() {}

  ngAfterViewInit(){
    this.createChart();
  }
  ngOnChanges(changes: SimpleChanges){
    console.log('changes',changes);
    if(this.chart){
      this.updateChartData(changes['data'].currentValue);
    }
  }

  private createChart(){

    var chartData = this.data;
    console.log('chart data',chartData);
    // var chartData = [
    //   {
    //     "date": "2012-01-01",
    //     "distance": 227,
    //     "duration": 408
    //   },
    //   {
    //     "date": "2012-01-02",
    //     "distance": 371,
    //     "duration": 482
    //   },
    //   {
    //     "date": "2012-01-03",
    //     "distance": 433,
    //     "duration": 562
    //   },
    //   {
    //     "date": "2012-01-04",
    //     "distance": 345,
    //     "duration": 379
    //   },
    //   {
    //     "date": "2012-01-05",
    //     "distance": 480,
    //     "duration": 501
    //   },
    //   {
    //     "date": "2012-01-06",
    //     "distance": 386,
    //     "duration": 443
    //   },
    //   {
    //     "date": "2012-01-07",
    //     "distance": 348,
    //     "duration": 405
    //   },
    //   {
    //     "date": "2012-01-08",
    //     "distance": 238,
    //     "duration": 309
    //   },
    //   {
    //     "date": "2012-01-09",
    //     "distance": 218,
    //     "duration": 287
    //   },
    //   {
    //     "date": "2012-01-10",
    //     "distance": 349,
    //     "duration": 485
    //   },
    //   {
    //     "date": "2012-01-11",
    //     "distance": 603,
    //     "duration": 890
    //   },
    //   {
    //     "date": "2012-01-12",
    //     "distance": 534,
    //     "duration": 810
    //   }
    // ];
    var chart;

    if (AmCharts.isReady) {
      this.chart = createChart();
    } else {
      AmCharts.ready(function () {
        this.chart  = createChart();
      });
    }
    function createChart(){
      // SERIAL CHART
      chart = new AmCharts.AmSerialChart();
      chart.dataProvider = chartData;
      chart.categoryField = "date";
      chart.dataDateFormat = "YYYY-MM-DD";
      chart.marginTop = 0;

      // AXES
      // category axis
      var categoryAxis = chart.categoryAxis;
      categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
      categoryAxis.minPeriod = "MM"; // our data is daily, so we set minPeriod to DD
      //categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD

      categoryAxis.autoGridCount = false;
      categoryAxis.gridCount = 50;
      categoryAxis.gridAlpha = 0;
      categoryAxis.gridColor = "#000000";
      categoryAxis.axisColor = "#555555";
      // we want custom date formatting, so we change it in next line
      categoryAxis.dateFormats = [{
        period: 'MM',
        format: 'MM '
      }, {
        period: 'WW',
        format: 'MMM DD'
      }, {
        period: 'MM',
        format: 'MMM'
      }, {
        period: 'YYYY',
        format: 'YYYY'
      }];

      // as we have data of different units, we create two different value axes
      // Duration value axis
      var durationAxis = new AmCharts.ValueAxis();
      durationAxis.title = "duration";
      durationAxis.gridAlpha = 0.05;
      durationAxis.axisAlpha = 0;
      durationAxis.tickLength = 0;
      durationAxis.inside = true;
      // the following line makes this value axis to convert values to duration
      // it tells the axis what duration unit it should use. mm - minute, hh - hour...
      durationAxis.duration = "mm";
      durationAxis.durationUnits = {
        DD: "d. ",
        hh: "h ",
        mm: "min",
        ss: ""
      };
      chart.addValueAxis(durationAxis);

      // Distance value axis
      var distanceAxis = new AmCharts.ValueAxis();
      distanceAxis.title = "distance";
      distanceAxis.gridAlpha = 0;
      distanceAxis.position = "right";
      distanceAxis.inside = true;
      distanceAxis.unit = "m";
      distanceAxis.axisAlpha = 0;
      distanceAxis.tickLength = 0;
      chart.addValueAxis(distanceAxis);

      // GRAPHS
      // duration graph
      var durationGraph = new AmCharts.AmGraph();
      durationGraph.title = "duration";
      durationGraph.valueField = "duration";
      durationGraph.type = "line";
      durationGraph.valueAxis = durationAxis; // indicate which axis should be used
      durationGraph.lineColor = "#CC0000";
      durationGraph.balloonText = "[[value]]";
      durationGraph.lineThickness = 1;
      durationGraph.legendValueText = "[[value]]";
      durationGraph.bullet = "square";
      durationGraph.bulletBorderColor = "#CC0000";
      durationGraph.bulletBorderAlpha = 1;
      durationGraph.bulletBorderThickness = 1;
      chart.addGraph(durationGraph);

      // distance graph
      var distanceGraph = new AmCharts.AmGraph();
      distanceGraph.valueField = "distance";
      distanceGraph.title = "distance";
      distanceGraph.type = "column";
      distanceGraph.fillAlphas = 0.1;
      distanceGraph.valueAxis = distanceAxis; // indicate which axis should be used
      distanceGraph.balloonText = "[[value]] meters";
      distanceGraph.legendValueText = "[[value]] m";
      distanceGraph.legendPeriodValueText = "total: [[value.sum]] m";
      distanceGraph.lineColor = "#000000";
      distanceGraph.lineAlpha = 0;
      chart.addGraph(distanceGraph);

      // CURSOR
      var chartCursor = new AmCharts.ChartCursor();
      chartCursor.zoomable = false;
      chartCursor.categoryBalloonDateFormat = "MM";
      chartCursor.cursorAlpha = 0;
      chartCursor.valueLineEnabled = true;
      chartCursor.valueLineBalloonEnabled = true;
      chartCursor.valueLineAxis = distanceAxis;
      chart.addChartCursor(chartCursor);

      // LEGEND
      var legend = new AmCharts.AmLegend();
      legend.bulletType = "round";
      legend.equalWidths = false;
      legend.valueWidth = 120;
      legend.color = "#000000";
      legend.useGraphSettings = true;
      chart.addLegend(legend);

      chart['export'] = {
        "enabled": true,
            "libs": {
          "path": "assets/libs/"
        },
        "menu": [ {
          "class": "export-main",
          "menu": [ {
            "label": "Download",
            "menu": [ "PNG", "JPG", "CSV","PDF" ]
          }, {
            "label": "Annotate",
            "action": "draw",
            "menu": [ {
              "class": "export-drawing",
              "menu": [ "PNG", "JPG" ]
            } ]
          } ]
        } ]
      };

      // WRITE
      chart.write("chartdiv");
      return chart;
    }
  }

  updateChartData(data){
    this.chart.dataProvider = data;
    this.chart.validateData();
  }


}
