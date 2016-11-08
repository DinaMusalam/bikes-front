/**
 * Created by Python on 7/12/2016.
 */
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable, Observer} from "rxjs/Rx";

@Injectable()
export class HttpClient {

    constructor(private http: Http) {
    }

    get(url):Observable<Response>{
        return this.http.get(url,this.createAuthOptions());
    }
    post(url,data):Observable<Response>{
        return this.http.post(url,data,this.createAuthOptions());
    }

    put(url,data):Observable<Response>{
        return this.http.put(url,data,this.createAuthOptions());
    }

    delete(url):Observable<Response>{
        return this.http.delete(url,this.createAuthOptions());
    }

    upload(url:string,formData:FormData):Observable<any>{
        return Observable.create((observer:Observer<any>)=>{


            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState===4){
                    if(xhr.status==200)
                        observer.next(JSON.parse(xhr.response));
                    else observer.error(xhr.response);

                    observer.complete();
                }
            };

            xhr.open('post',url,true);
            xhr.setRequestHeader('Authorization','');
            xhr.setRequestHeader('enctype','multipart/form-data');

            xhr.send(formData);
        });
    }


    private createAuthOptions(headers?:Headers){
        if(headers)
            return new RequestOptions({headers:headers});

         let newHeaders= new Headers({
            'Authorization':'',
            'Content-Type':'application/json'
        });

        return new RequestOptions({headers:newHeaders});
    }

}