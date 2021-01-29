import { ViewChild,Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import 'rxjs/add/observable/interval';


/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',

})
export class ContactPage {
  @ViewChild(Slides) slides: Slides;
  user: string = "userSearch";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }



}
