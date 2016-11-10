/**
 * Created by Python on 11/1/2016.
 */
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ConversionService {

    constructor() { }

  toKM(num_value:number){
    return num_value/1000;
  }

  optimizeDistance(distance:number)
  {
    let ret:{distance ; unit} ;
    if(distance < 1000)
    {
      ret= {"distance":distance , "unit":"m"};
      return ret ;
    }
    ret = {"distance":(distance/1000).toFixed(2), "unit":"km"};
    
    return ret ;
    

  }

  toCO2(num_value2:number)
  {
    return num_value2*0.13;           //take kilometers and return the value of co2 in kg
  }

  format(date_value:string, format:string)
  {
   return moment(date_value).format(format);
  }

  humanizeDuration(duration:number)
  {
    return (moment.duration(duration, "seconds" )).humanize();
  }

}
