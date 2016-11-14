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



}