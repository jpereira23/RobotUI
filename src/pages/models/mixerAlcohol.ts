import { Beverage } from './beverage';
export class MixerAlcohol{
  beverage: Beverage;
  scale: number;
  max: number;

  constructor(){
    this.beverage = new Beverage();
    this.scale = 0;
    this.max = 0;
  }
}
