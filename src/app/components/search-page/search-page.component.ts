import {Component, OnInit, ViewChild} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {CsvService} from "../../../services/csv.service";
import {FilterOptions} from "../../lib/my_lib-d";
import * as moment from 'moment';
import {PDFService} from "../../../services/pdf.service";
import {MapService} from "../../../services/map.service";


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  countries:any[];
  cities:any[];
  cityFilterKeyword='';
  selectedCountry;
  selectedCity;
  timeStarted = (new Date()).toISOString();
  timesEnded = (new Date()).toISOString();
  timeResolution;
  timeResolutionList=['year','month','day'];
  selectedCountryId;
  reportData;
  reportDataColumns = [
    {title: "Duration", dataKey: "duration",unit:"Hour"},
    {title: "Distance", dataKey: "distance",unit:"Km"},
    {title: "Date", dataKey: "date",unit:""}

  ];
  cityStatistics:any[];
  tripCoordinates=[];
  mapCenter=[ 14.9023,58.87988];
  mapZoom = 6;

  //searchBoxVisible=true;
  mapStyles = [{name:'dark',style:'mapbox://styles/mapbox/dark-v9',route:"#00BB44"},{name:'street',style:'mapbox://styles/mapbox/streets-v9',route:"#FF4B1C"}];
  selectedMapStyle = this.mapStyles[1];
  pet='table';

  @ViewChild('my_report') reportEle;

  constructor( private filterService:FilterService,
               private mapService:MapService,
               private csvService:CsvService,
               private pdfService:PDFService,
              ) {}

  ngOnInit() {
    this.visualize();
    this.getCountries();
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
  }
  private visualize(){
    this.mapService.createMap({
      container: 'map', // container id
      style: this.selectedMapStyle.style, //stylesheet location
      center:this.mapCenter, // starting position
      zoom: this.mapZoom // starting zoom
    });
    this.mapService.onMapLoad(()=>this.addRoute(this.tripCoordinates));
  }

  getCountries(){
    this.filterService.getCountries().subscribe(data=>{
      //console.log('countries',data.countries);
      this.countries = data.countries;
    },error=>{console.log('error in getting countries',error);});
  }

  getCities(countryId){
    this.cities=null;
    this.selectedCity=null;
    this.selectedCountry = (this.countries.filter(country=>country.geonameid==countryId))[0];
    console.log('selected country',this.selectedCountry);
    this.filterService.getCities(countryId).subscribe(data=>{
      //console.log('countries',data.countries);
      this.cities = data.cities;
    },error=>{console.log('error in getting cities',error);});
  }

  getCity(cityId){
    console.log('sdsdsdsdsd',cityId);
    let city = this.cities.filter(city=>cityId==city.geonameid)[0];
    console.log('selected city',city);
    this.selectedCity = city;
    this.mapCenter = [this.selectedCity.longitude,this.selectedCity.latitude];
    this.mapZoom = 12;
    this.visualize();
    this.visualizeGeneralInfo(city);
    this.filterService.getCityStatistics(city.geonameid).subscribe(data=>{
      console.log('city statistics',data);
      this.cityStatistics = data.statistics;
    },error=>{console.log('error in getting city',error);});
  }

  visualizeGeneralInfo(city){
    //to do add map
  }

  setTimeResolution(timeRes){
    this.timeResolution=timeRes;
  }

  saveCsvFile(data){
    let csv = this.csvService.ConvertToCSV(data);
    window.open("data:text/csv;charset=utf-8," +csv ,'report');

  }

  savePDF(){
    this.pdfService.createHtml(this.reportEle.nativeElement);
  }

  saveTableAsPDF(){
    this.pdfService.saveTable(this.reportDataColumns,this.reportData);
  }

  getData(){
    let filterOptions:FilterOptions = {
      timeStarted:this.timeStarted,
      timeEnded:this.timesEnded,
      timeResolution:this.timeResolution,
      cityId:(this.selectedCity)?this.selectedCity.geonameid:null,
      countryId:(this.selectedCountry)?this.selectedCountry.geonameid:null
    };
    let validateOptions = function(options:FilterOptions){
      console.log('validating');

      if(!options.cityId) return false;
      if(!options.countryId) return false;
      if(!options.timeResolution) return false;

      if(moment(options.timeEnded).isSameOrBefore(options.timeStarted, options.timeResolution))
        return false;

      return true;

    };
    if(!validateOptions(filterOptions)){
      window.alert('Some filter parameters are missing..');
      return false;
    }
    //console.log('filter options',filterOptions);
    this.getReport(filterOptions);
  }

  private getReport(filterOptions:FilterOptions){
      this.filterService.getData(filterOptions).subscribe(data=>{
        console.log('city statistics',data);
        this.reportData = data;
        this.filterService.getGeoJson({cityId:2692969,timeStarted:this.timeStarted,timeEnded:this.timesEnded}).subscribe(_data=>{
          let data = JSON.parse(_data.st_asgeojson);
          console.log('geojson foo boo',data);
          this.tripCoordinates = data.coordinates;
          this.mapCenter = this.tripCoordinates[0];
          console.log('geojson array lenght',data.coordinates.length);
          //this.visualize();

        },error=>console.log('eeror in getting city geojson', error));
      },error=>{console.log('error in getting city statistics',error)});
      }

  testMalmo(){
    let filterOptions:FilterOptions = {
      timeStarted:'2016-03-13T08:29:29.000Z',
      timeEnded:'2016-04-13T08:29:29.000Z',
      timeResolution:'month',
      cityId:2692969,
      countryId:null
    };
    this.timeStarted = filterOptions.timeStarted;
    this.timesEnded = filterOptions.timeEnded;
    this.getReport(filterOptions);
  }
  testStockholm(){
    let filterOptions:FilterOptions = {
      timeStarted:'2014-03-13T08:29:29.000Z',
      timeEnded:'2016-04-13T08:29:29.000Z',
      timeResolution:'month',
      cityId:2673730,
      countryId:null
    };
    this.timeStarted = filterOptions.timeStarted;
    this.timesEnded = filterOptions.timeEnded;
    this.getReport(filterOptions);
  }

}
