import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class BluetoothService{
  aDevice: any;
  loading: boolean = false;
  isConnected: boolean = false;

  constructor(private bluetoothSerial: BluetoothSerial){

  }

  checkAvailability(){
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.isConnected().then(() => {
        resolve(true);
      }, (err) => {
        resolve(false);
      });
    });
  }

  checkEnabled(){
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.isEnabled().then(() => {
        resolve(true);
      }, (err) => {
        resolve(false);
      });
    });
  }

  subscribeRawData(){
    return this.bluetoothSerial.subscribeRawData();
  }

  read(){
    return this.bluetoothSerial.read();
  }

  connect(){
    return this.bluetoothSerial.connect(this.aDevice.address);
  }

  writeStuff(alcohols: Uint8Array){
    this.bluetoothSerial.write(alcohols).then((success) => {

    }, (error) => {
      console.log(error);
    });
  }

  getAllBluetoothDevices(){
    return new Promise((resolve, reject) => {
    this.bluetoothSerial.isEnabled().then((data) => {
      this.bluetoothSerial.list().then((allDevices) => {
        console.log(allDevices);
        for(var i = 0; i < allDevices.length; i++)
        {
          if(allDevices[i].name == "Adafruit Bluefruit LE")
          {

            this.aDevice = allDevices[i];
            this.loading = true;
            resolve(true);
          }
        }
        resolve(false);
      });
    });
  });
  }
}
