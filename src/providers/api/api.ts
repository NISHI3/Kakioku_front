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
  // btoaでbasic認証のキーを作成
  btoa = btoa('user:password');
  // Authorization: Basic {btoa} でBAsic認証
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Basic ${this.btoa}`,
    })
  }

  constructor(public http: HttpClient) {

  }

  // BLEを全取得
  getBleList(): Observable<any> {
    return this.http.get<Ble[]>('/api/ble/getall', this.httpOptions);
  }

  getBle(uuid): Observable<any> {
    return this.http.get(`/api/ble/get?ble_uuid=${uuid}`);
  }

  getMessage(): Observable<any> {
    return this.http.get('/api/message/get');
  }

  postSighup(name, uuid): Observable<any> {
    let postData = {
      "user_name": name,
      "device_name": uuid
    }
    return this.http.post<any>('/api/user/signup', postData, this.httpOptions)
  }

  serchUserName(name) :Observable<any> {
    return this.http.get<any>(`/api/user/get?search_word=${name}&`);
  }
}
