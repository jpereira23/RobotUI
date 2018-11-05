export class Drink{
  drinkName: string;
  username: string;
  numbersArray: Uint8Array;

  constructor(){
    this.drinkName = "";
    this.username = "";
    this.numbersArray = new Uint8Array(13);

  }
}
