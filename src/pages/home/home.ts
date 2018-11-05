import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../data.service';
import { Robot } from '../models/robot';
import { Storage } from '@ionic/storage';
import { QueueOfOrders } from '../queueOfOrders/queueOfOrders';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  robotID: string;
  constructor(public navCtrl: NavController, private dataService: DataService, private storage: Storage) {

  }

  ionViewDidEnter(){
    this.storage.get('botConfiguration').then((value) => {
      if(value != null){
        this.navCtrl.push(QueueOfOrders);
      }
    });
  }

  confirm(){
    console.log(this.robotID);
    var robot = new Robot();
    robot.bartendId = this.robotID;
    this.storage.set('botConfiguration', robot);
    this.dataService.configureRobot(robot).subscribe();
    this.navCtrl.pop();

  }

}
