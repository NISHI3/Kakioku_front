import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Ble } from '../interfaces/Ble'

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  //　APIのURLを変更
  url = 'https://kakioku-api-server.herokuapp.com';
  // btoaでbase64エンコードしているので、'user:password'で変換
  basic = btoa('user:password')
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Basic ${this.basic}`
    })
  }
  constructor(public http: HttpClient) {
    
  }
  
  getBleList(): Observable<any> {
    return this.http.get<Ble[]>(`${this.url}/api/ble/get`, this.httpOptions);
  }

  getMessage(): Observable<any> {
    return this.http.get('/api/message/get');
  }
}


// Basic dXNlcjpwYXNzd29yZA==
// headers: new HttpHeaders().set('Authorization', 'basic aGM0YXBwOmHjddP5NjU='),
// Basic dXNlcjpwYXNzd29yZA==