import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Beverage } from '../models/beverage';

@Component({
  selector: 'page-add-beverage',
  templateUrl: 'addBeverage.html'
})

export class AddBeveragePage{

  booleanMixer: boolean = false;
  booleanAlcohol: boolean = true;
  drinkName: string = "";
  beverages: Array<Beverage> = [];
  constructor(private storage: Storage, private navCtrl: NavController){
    this.storage.get('beverages').then((data) => {
      if(data != null){
        for(var i = 0; i < data.length; i++){
          var aBeverage = new Beverage();
          aBeverage.drinkName = data[i].drinkName;
          aBeverage.alcohol = data[i].alcohol;
          aBeverage.mixer = data[i].mixer;
        }
      }
    });
  }

  alcoholToggle(){
    if(this.booleanAlcohol == true){
      this.booleanMixer = false;
    }
    else if(this.booleanAlcohol == false){
      this.booleanMixer = true;
    }
  }

  mixerToggle(){
    if(this.booleanMixer == true){
      this.booleanAlcohol = false;
    }
    else if(this.booleanMixer == false){
      this.booleanAlcohol = true;
    }
  }

  submit(){
    var beverage = new Beverage();
    beverage.drinkName = this.drinkName;
    beverage.mixer = this.booleanMixer;
    beverage.alcohol = this.booleanAlcohol;
    this.beverages.push(beverage);
    this.storage.set('beverages', this.beverages);

    this.navCtrl.pop();


  }
}
