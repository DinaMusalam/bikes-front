/**
 * Created by Python on 11/1/2016.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CsvService {

    constructor() { }

    ConvertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}


}