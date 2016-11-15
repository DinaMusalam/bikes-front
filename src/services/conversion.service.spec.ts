import {ConversionService} from "./conversion.service";
/**
 * Created by Python on 11/15/2016.
 */

describe('conversion service',()=>{
    const conversionService = new ConversionService();
    it('Should convert meter to km ',()=>{
        console.log('conv km to km : ',conversionService.toKM(5000));
        expect(conversionService.toKM(5000)).toBe('5.0');
    });
});