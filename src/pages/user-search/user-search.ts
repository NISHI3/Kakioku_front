import { Component,Input ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Slides} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the UserSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-search',
  templateUrl: 'user-search.html',
})
export class UserSearchPage {
  @Input() text:string;
  inputSearch:string = '';
  getMes: string[] = [];
  errMes : string ='';
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams,public api: ApiProvider) {
  }

  userSearch(){
    this.api.serchUserName(this.inputSearch)
      .subscribe(
        data => {
      if (data.code === 200) {
         this.getMes=data.result
      }
    else if(data.code === 404) {
      this.errMes = "リクエストなし";
    }
  }, err => console.log(err),
() => {}
      )
  }

}
