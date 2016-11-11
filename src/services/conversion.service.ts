/**
 * Created by Python on 11/1/2016.
 */
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ConversionService {

    constructor() { }

  toKM(num_value:number){
    return (num_value/1000).toFixed(1);
  }
  toHours(duration:number){
    return Math.floor(duration/3600);
  }

  optimizeDistanceFunny(distance:any)
  {
    let earthCir:number = 40000; //unit in km
    let totalTravels = +  ((distance/1000)/earthCir).toFixed(1);
    if(totalTravels>1)
      return totalTravels+' travels around the earth';
    else
      return totalTravels+' travel around the earth';

  }

  optimizeDurationFunny(duration:number)
  {
    let secondsPerYear = 3600*24*365; //unit in km
    let age = Math.floor(duration/secondsPerYear);
    return age+' years old man, all his life on the bike';

  }

  optimizeDistance(distance:any)
  {
    //let distance = parseFloat(_distance);
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
    let diff;
    let ret:{value:number;unit:string};
    diff =  (moment().add(duration,'s')).diff(moment(),'days');
    if(diff>10){
      ret = {value:diff,unit:'days'};
      return ret ;
    }
    if(diff>0){
      diff =  (moment().add(duration,'s')).diff(moment(),'hours');
      ret = {value:diff,unit:'hours'};
      return ret;
    }
    else {
      diff =  (moment().add(duration,'s')).diff(moment(),'minutes');
      ret = {value:diff,unit:'minutes'};
      return ret;
    }
  }

}
