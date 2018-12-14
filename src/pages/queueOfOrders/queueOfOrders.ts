import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DataService } from '../data.service';
import { Drink } from '../models/drink';
import { MixerAlcohol } from '../models/mixerAlcohol';
import { Beverage } from '../models/beverage';
import { HomePage } from '../home/home';
import { BluetoothService } from '../bluetooth.service';

@Component({
  selector: 'page-queue',
  templateUrl: 'queueOfOrders.html'
})

export class QueueOfOrders{

  connected: boolean = false;
  inProgress: boolean = false;
  constructor(public navCtrl: NavController, private dataService: DataService, private ref: ChangeDetectorRef, private bluetoothService: BluetoothService, private alertCtrl: AlertController){
    this.dataService.triggerRequest();

  }

  ionViewWillEnter(){
    //this.dataService.robotConnected();
    this.dataService.receivedSocket$.subscribe(data => {
      this.takeOrders();
    });


    this.dataService.robot$.subscribe(data => {
      if(data == null){
        this.navCtrl.push(HomePage);
      } else if(this.connected == false) {
        this.connectToRobot();
      }
    });

    this.dataService.getBotConfiguration();

  }

  connectToRobot(){
    //this.dataService.robotDisconnected();
    var availabilityPromise = this.bluetoothService.getAllBluetoothDevices();

    availabilityPromise.then((available) => {
      this.inProgress = true;
      if(available == true){
        var theConnect = this.bluetoothService.connect();
        theConnect.subscribe(success => {
          this.dataService.robotConnected();
          this.connected = true;
          this.inProgress = false;
          this.dataService.getDrinks();
        }, error => {
          this.inProgress = false;
          //if bluetooth cant connect
          const alert = this.alertCtrl.create({
            title: 'Robot Error',
            subTitle: 'Internal issues with robot (Bluetooth)',
            buttons: [{
              text: 'OK',
              role: 'Cancel',
              handler: () => {
              }
            }]
          });
        });
      }
    });
  }

  takeOrders(){
    var rawData = this.bluetoothService.subscribeRawData();
    rawData.subscribe((dt) => {
      var read = this.bluetoothService.read();
      read.then((dd) => {
        const alert = this.alertCtrl.create({
          title: 'Drink Finished',
          subTitle: 'Select \'OK\' when you have picked up your drink and replaced an empty cup for the bartender.',
          buttons:[{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              this.dataService.drinks.shift();
              this.dataService.finishedDrink();
              if(this.dataService.drinks.length > 0){
                this.bluetoothService.writeStuff(this.dataService.drinks[0].numbersArray);
                this.ref.detectChanges();
              }
            }
          }]
        });
        alert.present();
      });
    });
    this.bluetoothService.writeStuff(this.dataService.drinks[0].numbersArray);
  }
}
