import {UserService} from "./user.service";
import {Observable, Observer} from "rxjs/Rx";
/**
 * Created by Python on 11/15/2016.
 */
describe('user service',()=>{
    const userService = new UserService(new HttpClient());



    it('should get the user rank',()=>{

    });




});

export class HttpClient{

    constructor(){}
    
    get(url){
        return Observable.create(Observer=>{
            return Observer.complete({rank:100,total:1200});
        });
    };
}