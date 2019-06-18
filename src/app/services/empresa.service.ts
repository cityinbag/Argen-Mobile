import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  server: string = 'http://evsite.com.br/argen/';
  
  constructor(public http: Http) { 
  }

  apiEmpresas(body, file):Observable<any>{
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({'Content-Type': type});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.server + file, JSON.stringify(body),options)
    .map(res => res.json());
  }


}


