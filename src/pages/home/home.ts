import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Ble } from '../../providers/interfaces/Ble';

import { CreateLetterPage } from '../create-letter/create-letter';
import { UserSearchPage } from '../user-search/user-search';
import { OtherPage } from '../other/other';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bles: Ble[];

  constructor(public navCtrl: NavController, public api: ApiProvider) {
  }
  // めんどいので各ページでFunctionを作成
  public pushCreatePage() {
    this.navCtrl.push(CreateLetterPage);
  }
  public pushMessagePage() {
    this.navCtrl.push(CreateLetterPage);
  }
  public pushContactPage() {
    this.navCtrl.push(UserSearchPage);
  }
  public pushOtherPage() {
    this.navCtrl.push(OtherPage);
  }
}
