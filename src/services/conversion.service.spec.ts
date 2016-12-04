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

    it('Should convert to hour ',()=>{
        console.log('conv s to H : ',conversionService.toHours(3600));
        expect(conversionService.toHours(3600)).toBe(1);
    });


    it('Should optimize distance ',()=>{
        console.log('optimize distance : ',conversionService.optimizeDistance(900));
        expect(conversionService.optimizeDistance(900)).toEqual({distance:900, unit:'m'});
         console.log('optimize distance : ',conversionService.optimizeDistance(1200));
        expect(conversionService.optimizeDistance(1200)).toEqual({distance:'1.20', unit:'km'});
        
    });
    
     it('Saved CO2 ',()=>{
        console.log('saved CO2 : ',conversionService.toCO2(2600));
        expect(conversionService.toCO2(2600)).toBe(338);
    });
    
       it('optimize Distance Funny ',()=>{
        console.log('optimize Distance Funny : ',conversionService.optimizeDistanceFunny(100000000));
        expect(conversionService.optimizeDistanceFunny(100000000)).toBe('2.5 travels around the earth');
    });
    
         it('optimize Duration Funny ',()=>{
        console.log('optimize Duration Funny : ',conversionService.optimizeDurationFunny(100000000));
        expect(conversionService.optimizeDurationFunny(100000000)).toBe('3 years old man, all his life on the bike');
    });

});