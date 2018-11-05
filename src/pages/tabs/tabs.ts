import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { QueueOfOrders } from '../queueOfOrders/queueOfOrders';
import { SetupPage } from '../setup/setup';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage{
  tab1Root = QueueOfOrders;
  tab2Root = SetupPage;
  @ViewChild('myTabs') tabRef: Tabs

  constructor(){

  }
}
