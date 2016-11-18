import { Component, OnInit } from '@angular/core';
import {MapService} from "../../../services/map.service";
import {TripService} from "../../../services/trip.service";

@Component({
  selector: 'app-heatmap-test',
  templateUrl: './heatmap-test.component.html',
  styleUrls: ['./heatmap-test.component.css']
})
export class HeatmapTestComponent implements OnInit {

  coordinates:any[];
  tripId = '9dbd21f9-6bfb-43e2-8674-0d96b0572e0f';

  constructor(private mapService:MapService,private tripService:TripService) { }

  ngOnInit() {

    this.getTripRouteAndDrawMap();
  }

  getTripRouteAndDrawMap(){
    this.tripService.getTripGeoJson(this.tripId).subscribe(_data=>{
      let data = JSON.parse(_data.st_asgeojson);
      this.coordinates = data.coordinates;
      this.mapService.createMap({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center:this.coordinates[0], // starting position
        zoom: 14 // starting zoom
      });
      console.log('trip coords',this.coordinates);
      this.mapService.onMapLoad(()=>this.addRoute());
    });
  }

  addRoute(){
    let source = 'route';
    this.mapService.addSource(source, {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": this.coordinates
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
        "line-color": "#888",
        "line-width": 8
      }
    });
  }




}
