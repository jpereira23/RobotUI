import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { SetupPage } from '../pages/setup/setup';
import { CustomSlotView } from '../pages/customSlotView/customSlotView';
import { CustomPopoverView } from '../pages/customPopoverView/customPopoverView';
import { AddBeveragePage } from '../pages/addBeverage/addBeverage';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothService } from '../pages/bluetooth.service';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QueueOfOrders } from '../pages/queueOfOrders/queueOfOrders';
import { DataService } from '../pages/data.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QueueOfOrders,
    TabsPage,
    SetupPage,
    CustomSlotView,
    CustomPopoverView,
    AddBeveragePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QueueOfOrders,
    TabsPage,
    SetupPage,
    CustomSlotView,
    CustomPopoverView,
    AddBeveragePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    BluetoothService,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
