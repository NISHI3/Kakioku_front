import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Ble } from '../../providers/interfaces/Ble';
import { IBeacon, IBeaconPluginResult } from '@ionic-native/ibeacon';

import { CreateLetterPage } from '../create-letter/create-letter';
import { OtherPage } from '../other/other';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bles: Ble[];
  message: string;
  // date = Math.floor(new Date().getTime()/ 1000);
  private uuid: string = 'ff4f5d76-304a-42ff-a9e2-ef25178b1055';
  constructor(public navCtrl: NavController, public api: ApiProvider, private readonly ibeacon: IBeacon, private readonly platform: Platform, public toastCtrl: ToastController) {
    this.enableDebugLogs();
    this.onStartClicked()
  }

  public enableDebugLogs(): void {
    this.platform.ready().then(async () => {
      this.ibeacon.enableDebugLogs();
      this.ibeacon.enableDebugNotifications();
    });
  }

  public onStartClicked(): void {
    this.platform.ready().then(() => {
      this.startBleFun();
    });
  }

  public startBleFun(): void {

    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    // Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => {
        if(pluginResult !== null) {
          console.log(pluginResult.beacons[0].uuid);
          if(pluginResult.beacons[0].proximity === "ProximityImmediate") {
            this.pushBeacon(pluginResult.beacons[0].uuid)
          }
        }
      },
      (error: any) => console.error(`Failure during ranging: `, error),
    );
    delegate.didStartMonitoringForRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => console.log('didStartMonitoringForRegion: ', pluginResult),
      (error: any) => console.error(`Failure during starting of monitoring: `, error)
    );

    delegate.didEnterRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => {
        console.log('離れたとき: ', pluginResult);
      }
    );

    delegate.didExitRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => {
        console.log('didExitRegion: ', pluginResult);
      }
    );

    console.log(`Creating BeaconRegion with UUID of: `, this.uuid);
    const beaconRegion = this.ibeacon.BeaconRegion('nullBeaconRegion', this.uuid, 1, 1);
    // const beaconRegion = this.ibeacon.BeaconRegion('nullBeaconRegion', '');

    this.ibeacon.startMonitoringForRegion(beaconRegion).then(
      () => console.log('Native layer recieved the request to monitoring'),
      (error: any) => console.error('Native layer failed to begin monitoring: ', error)
    );

    this.ibeacon.startRangingBeaconsInRegion(beaconRegion)
      .then(() => {
        console.log(`Started ranging beacon region: `, beaconRegion);
      })
      .catch((error: any) => {
        console.error(`Failed to start ranging beacon region: `, beaconRegion);
    });
  }

  // pushBeacon
  public pushBeacon(uuid:string) {
    let date = Math.floor(new Date().getTime() / 1000);
    // let data = []
    //   data.push({uuid: uuid, time: date})
      // localStorage.setItem("uuidList", JSON.stringify(data));
      let uuidList: any = JSON.parse(localStorage.getItem("uuidList"))
      console.log("uuidList2"+ JSON.stringify(uuidList))
    // console.log(uuidList);
    if(uuidList === null  || uuidList === undefined || uuidList === '') {
      let data = []
      data.push({uuid: uuid, time: date})
      localStorage.setItem("uuidList", JSON.stringify(data));
      console.log("uuidList2"+ uuidList)
    } else {
      let uuidList2: any = uuidList;
      uuidList2.filter((item, index) => {
        if(item.uuid === uuid) {
          console.log("一致している")
          console.log(date +"-"+ item.time +"="+ (date-item.time))
          if(date - item.time > 30) {
            this.api.getMessage(item.uuid)
              .subscribe(
                data => {
                  let result = data['result']
                  let node = result.length-1
                  this.message = data['result'][node]['body']
                  const toast = this.toastCtrl.create({
                    message: `Message: ${this.message}`,
                    duration: 5000,
                    showCloseButton: true
                  });
                  toast.present();
                },
                err => console.log(err),
                () => {}
              )
          }
        }
        item.time = date;
      })
      localStorage.setItem("uuidList", JSON.stringify(uuidList2));
    }
  }

  public presentToast() {
    let toast = this.toastCtrl.create({
      message: `User was added successfully User was added successfully`,
      duration: 3000,
      cssClass: 'toast-message',
      showCloseButton: true
      // position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  // めんどいので各ページでFunctionを作成
  public pushCreatePage() {
    this.navCtrl.push(CreateLetterPage);
  }
  public pushMessagePage() {
    this.navCtrl.push(CreateLetterPage);
  }
  public pushContactPage() {
    this.navCtrl.push(CreateLetterPage);
  }
  public pushOtherPage() {
    this.navCtrl.push(OtherPage);
  }
}
