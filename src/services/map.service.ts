/**
 * Created by Python on 11/14/2016.
 */
import { Injectable } from '@angular/core';
import {mapbox_token} from "../app/lib/consts";
declare var mapboxgl:any;


@Injectable()
export class MapService {

    private map;

    constructor() { }

    createMap(options){
        mapboxgl.accessToken = mapbox_token;
        this.map = new mapboxgl.Map(options);
        this.map.addControl(new mapboxgl.NavigationControl());
    }

    onMapLoad(callback){
        this.map.on('load',callback);
    }

    getMapObject(){
        return this.map;
    }

    addSource(sourceName,config){
        this.map.addSource(sourceName, config);
    }

    addLayer(config){
        this.map.addLayer(config);
    }

    addMarker(el,marker:Feature){
        // add marker to map
        console.log('marker 1',marker);
        new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(this.map);

    }


}

export interface Feature{

    type:string;
    properties: {
        message:string
        iconSize: number[]
    },
    geometry: {
        type: string,
        coordinates: [number,number]
    }

}