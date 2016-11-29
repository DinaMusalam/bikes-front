import {Component, OnInit, Input} from '@angular/core';
import {MapService} from "../../../services/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()tripsGeojson=[];
  @Input()mapCenter;
  @Input()mapZoom;

  mapStyles = [{name:'dark',style:'mapbox://styles/mapbox/dark-v9',route:"#00BB44"},{name:'street',style:'mapbox://styles/mapbox/streets-v9',route:"#FF4B1C"}];
  selectedMapStyle = this.mapStyles[1];

  constructor(private mapService:MapService) {
  }

  ngOnInit() {
    this.visualize();
  }

  ngOnChanges(changes){
    console.log('changes',changes);
    if(changes.mapCenter)
      this.updateCenter(changes.mapCenter.currentValue);
    if(changes.mapZoom)
      this.updateZoom(changes.mapZoom.currentValue);
    if(changes.tripsGeojson){
      //this.updateCenter(((changes.tripsGeojson.currentValue)[0])[0]);
      this.updateZoom(12);
      this.addTripsRoutes();
    }
  }

  private addRoute(coordinates,color?){
    if(!this.mapService.getMapObject())return;
    if(!coordinates.length) return;
    let source = 'route-'+(new Date()).getMilliseconds()+'-'+Math.random();
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

    let lineColor=color?color:this.selectedMapStyle.route;

    this.mapService.addLayer({
      "id": source,
      "type": "line",
      "source": source,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-opacity":0.1,
        "line-color": lineColor,
        "line-width": 2
      }
    });
  }
  private addTripsRoutes(){
    for(let item of this.tripsGeojson){
      let geojson = JSON.parse(item.st_asgeojson );
      //let lineColor = '#'+(parseInt('F14584',16)+i*10).toString(16);
      let lineColor = '#F14584';
      this.addRoute(geojson.coordinates,lineColor);
    }
  }
  private visualize(){
    this.mapService.createMap({
      container: 'map', // container id
      style: this.selectedMapStyle.style, //stylesheet location
      center:this.mapCenter, // starting position
      zoom: this.mapZoom // starting zoom
    });
    this.mapService.onMapLoad(()=>this.addTripsRoutes());
  }
  private updateZoom(zoom:number){
    let map = this.mapService.getMapObject();
    if(map)
      map.setZoom(zoom);
  }
  private updateCenter(center){
    let map = this.mapService.getMapObject();
    if(map)
      map.setCenter(center);
  }

  selectMapStyle(styleName:string){
    let map = this.mapService.getMapObject();
    this.selectedMapStyle = this.mapStyles.filter(style=>style.name == styleName)[0];
    this.mapCenter = map.getCenter();
    this.mapZoom = map.getZoom();
    this.visualize();
  }

}
