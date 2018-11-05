import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';



@Injectable()
export class DataService {
  url: string = "http://138.197.205.247:8080/api/";
  headers = new Headers();
  result: any;


  constructor(private http: Http){
    this.headers.append('Content-Type', 'application/json');
  }

  triggerRequest(robotId: any){
    var aRobot = {
      bartendId: robotId
    };
    return this.http.post(this.url + 'triggerRequest', JSON.stringify(aRobot), { headers: this.headers}).map(res => res.json());
  }

  configureRobot(robotID: any){
    return this.http.post(this.url + 'registerBot', JSON.stringify(robotID), { headers: this.headers}).map(res => res.json());
  }


  saveSlots(beverages: Array<any>, id: any){
    var slotStuff = {
        beverages: beverages,
        id: id
    };
    return this.http.post(this.url + 'saveSlots', JSON.stringify(slotStuff), { headers: this.headers}).map(res => res.json());
  }

  getSlots(theId: string){
    var aBartend = {
      bartendId: theId
    };
    return this.http.get(this.url + 'getSlots/' + theId, {headers: this.headers}).map(res => res.json());
  }

  finishedDrink(theId: string){
    var aBartend = {
      bartendId: theId
    };

    return this.http.post(this.url + 'finishedDrink/', JSON.stringify(aBartend), {headers: this.headers}).map(res => res.json());
  }
}
