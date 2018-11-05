import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DataService } from '../data.service';
import { Drink } from '../models/drink';
import { MixerAlcohol } from '../models/mixerAlcohol';
import { Storage } from '@ionic/storage';
import { Beverage } from '../models/beverage';
import { HomePage } from '../home/home';
import { BluetoothService } from '../bluetooth.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'page-queue',
  templateUrl: 'queueOfOrders.html'
})

export class QueueOfOrders{

  socket = io('http://138.197.205.247:4000');
  drinks: Array<Drink> = [];
  bartendId: string = "";
  connected: boolean = false;

  constructor(public navCtrl: NavController, private dataService: DataService, private storage: Storage, private ref: ChangeDetectorRef, private bluetoothService: BluetoothService, private alertCtrl: AlertController){

  }

  ionViewWillEnter(){
    this.storage.get('botConfiguration').then((value) => {
      if(value == null){
        this.navCtrl.push(HomePage);
      } else {
        this.bartendId = value.bartendId;
        this.dataService.triggerRequest(this.bartendId).subscribe();
        this.socket.on(this.bartendId, (data) => {
          this.drinks = [];
          for(var i = 0; i < data.message.length; i++){
            var aDrink = new Drink();

            console.log(data.message[i].numbersArray);
            for(var j = 0; j < data.message[i].numbersArray.length; j++){
              aDrink.numbersArray[j] = data.message[i].numbersArray[j];
            }

            aDrink.username = data.message[i].aRobot.username;
            aDrink.drinkName = data.message[i].theDrink.drinkName;
            this.drinks.push(aDrink);
            this.ref.detectChanges();
          }
          if(this.connected == false){
              var availabilityPromise = this.bluetoothService.getAllBluetoothDevices();
              availabilityPromise.then((available) => {
                var rawData = this.bluetoothService.subscribeRawData();

                rawData.subscribe((dt) => {
                  var read = this.bluetoothService.read();
                  read.then((dd) => {
                    console.log("it is reading");


                      const alert = this.alertCtrl.create({
                        title: 'Drink Finished',
                        subTitle: 'Select \'OK\' when you have picked up your drink and replaced an empty cup for the bartender.',
                        buttons:[{
                          text: 'OK',
                          role: 'cancel',
                          handler: () => {
                            this.drinks.shift();
                            this.dataService.finishedDrink(this.bartendId).subscribe();
                            if(this.drinks.length > 0){
                              this.bluetoothService.writeStuff(this.drinks[0].numbersArray);
                              this.ref.detectChanges();
                            }
                          }
                        }]
                      });
                      alert.present();


                  });
                });
                if(available == true){
                  var theConnect = this.bluetoothService.connect();
                  theConnect.subscribe(success => {
                    this.connected = true;
                    this.bluetoothService.writeStuff(this.drinks[0].numbersArray);
                  }, error => {
                    console.log("SHIT DONT WORK");
                  });
                } else {
                  console.log("WHAT THE FUCK ITS FALSE!?!?!");
                }
              });
            } else {
              this.bluetoothService.writeStuff(this.drinks[0].numbersArray);
            }
          });
      }
    });


  }



  sendData(){

    this.dataService.finishedDrink(this.bartendId).subscribe();
  }
}
