 import { Injectable} from "@angular/core";
 import { Router} from '@angular/router';
 import { HttpClient, HttpHeaders } from '@angular/common/http'; 
 import { map } from 'rxjs/operators';
 import { Observable } from 'rxjs';
 
 
 const BACKEND_URL = "http://localhost:3000/"


@Injectable({providedIn: "root"})
export class Service{
    private isAuthenticated = false;


constructor( private http: HttpClient , private Router: Router){} 


public  employeeForm(body){
    alert("response 1")
    const url = BACKEND_URL + 'register';
    return this.http.post(url,body,{responseType:'json'}).pipe(map(res => {
        console.log(res);
        return res;
    }));
}





public getEmployeeForm(){
     
    const url = BACKEND_URL + 'getdata';
    return this.http.get(url,{responseType:'json'}).pipe(map(res => {
        console.log(res);
        return res;
    }));
}





}