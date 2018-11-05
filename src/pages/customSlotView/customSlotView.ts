import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Beverage } from '../models/beverage';
import { CustomPopoverView } from '../customPopoverView/customPopoverView';

@Component({
  selector: 'custom-slot-view',
  templateUrl: 'customSlotView.html'
})

export class CustomSlotView implements OnChanges{
  @Input() beverages: Array<Beverage> = [];
  @Input() aLabel: string;
  @Input() index: number;
  @Input() aSelectedBeverage: Beverage;
  @Output() finalProduct = new EventEmitter<Beverage>();
  selectedBeverage: Beverage;

  element: HTMLElement = document.getElementById('thePopover') as HTMLElement;

  constructor(private popoverController: PopoverController, private ref: ChangeDetectorRef){
    this.selectedBeverage = this.aSelectedBeverage;

  }

  ngOnChanges(change: SimpleChanges){

      this.selectedBeverage = change['aSelectedBeverage'].currentValue;
      console.log(this.selectedBeverage);
      this.beverages = change['beverages'].currentValue;
      this.aLabel = change['aLabel'].currentValue;
      this.ref.detectChanges();

  }

  clickIt(){
    this.presentPopover(this.element);
  }

  presentPopover(event){
    let popover = this.popoverController.create(CustomPopoverView, {
      beverages: this.beverages
    });

    popover.present({
      ev: event
    });

    popover.onDidDismiss((data) => {
      this.selectedBeverage = data.selectedBeverage;
      this.finalProduct.emit(data.selectedBeverage);
      this.ref.detectChanges();
    });
  }
}
