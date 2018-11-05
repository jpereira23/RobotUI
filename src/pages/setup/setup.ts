import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service';
import { Beverage } from '../models/beverage';
import { AddBeveragePage } from '../addBeverage/addBeverage';




@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})

export class SetupPage{
  bartendID: string;
  beverages: Array<Beverage> = [];
  loaded: boolean = false;
  availableBeverages: Array<Beverage> = [];

  constructor(private navCtrl: NavController, private storage: Storage, private dataService: DataService, private ref: ChangeDetectorRef){
    this.storage.get('botConfiguration').then((data) => {
        this.bartendID = data.bartendId;
        this.dataService.getSlots(this.bartendID).subscribe((data) => {
          console.log("hello");
            this.configureSlots(data.data);

        });
    });

    this.storage.get('beverages').then((data) => {
      if(data != null){
        for(var i = 0; i < data.length; i++){
          var aBeverage = new Beverage();
          aBeverage.drinkName = data[i].drinkName;
          aBeverage.mixer = data[i].mixer;
          aBeverage.alcohol = data[i].alcohol;
          this.availableBeverages.push(aBeverage);
        }
        this.ref.detectChanges();

      }
    });
  }

  ionViewWillEnter(){
    this.storage.get('beverages').then((data) => {
      if(data != null){
        for(var i = 0; i < data.length; i++){
          var aBeverage = new Beverage();
          aBeverage.drinkName = data[i].drinkName;
          aBeverage.mixer = data[i].mixer;
          aBeverage.alcohol = data[i].alcohol;
          this.availableBeverages.push(aBeverage);
        }
      }
    });
  }

  configureSlots(data: Array<any>){
    for(var i = 0; i < data.length; i++){
      var aBeverage = new Beverage();
      aBeverage.drinkName = data[i].drinkName;
      aBeverage.alcohol = data[i].alcohol;
      aBeverage.mixer = data[i].mixer;
      this.beverages.push(aBeverage);
      this.ref.detectChanges();
    }
    console.log(this.beverages);
    console.log("goodbye");

  }

  save(){
    this.dataService.saveSlots(this.beverages, this.bartendID).subscribe();
  }

  addBeverage(){
    this.navCtrl.push(AddBeveragePage);
  }

  setSlot(event, index){
    this.beverages[index] = event;
  }
}
