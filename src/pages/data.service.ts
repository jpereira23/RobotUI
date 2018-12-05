import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Robot } from './models/robot';
import { Drink } from './models/drink';
import { Observable, Subject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class DataService {
  url: string = "http://138.197.205.247:8080/api/";
  result: any;
  robot: Robot;
  robot$: Subject<Robot>;
  receivedSocket$: Subject<boolean>;
  drinks: Array<Drink> = [];
  socket = io('http://138.197.205.247:4000');
  menuTitle = "Welcome";


  constructor(private http: HttpClient, private storage: Storage){
    this.robot$ = new Subject<Robot>();
    this.receivedSocket$ = new Subject<boolean>();
  }

  getBotConfiguration(){
    this.storage.get('botConfiguration').then(value => {
      this.robot = value;
      this.robot$.next(value);
    });
  }

  triggerRequest(){
    this.http.post<Robot>(this.url + 'triggerRequest', this.robot, httpOptions).subscribe();
  }

  getDrinks(){

    if(this.robot != null){

      this.socket.on(this.robot.bartendId, (data) => {
        console.log(data.username);
        if(data.username == "null")
        {
          this.drinks = [];
          for(var i = 0; i < data.message.length; i++){
            var aDrink = new Drink();

            for(var j = 0; j < data.message[i].numbersArray.length; j++){
              aDrink.numbersArray[j] = data.message[i].numbersArray[j];
            }

            aDrink.username = data.message[i].aRobot.username;
            aDrink.drinkName = data.message[i].theDrink.drinkName;
            this.drinks.push(aDrink);
          }
          this.receivedSocket$.next(true);
        }

      });
    }
  }
  configureRobot(robotID: any){
    this.http.post<string>(this.url + 'registerBot', robotID, httpOptions).subscribe();
  }

  saveSlots(beverages: Array<any>){
    var slotStuff = {
        beverages: beverages,
        id: this.robot.bartendId
    };

    this.http.post<any>(this.url + 'saveSlots', slotStuff, httpOptions).subscribe();
  }

  getSlots(){

    this.http.get(this.url + 'getSlots' + this.robot.bartendId).subscribe(res => {
      console.log(res);
    });
  }

  finishedDrink(){
    this.http.post<Robot>(this.url + 'finishedDrink', this.robot, httpOptions).subscribe();
  }
}
