import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import {UserSearchPage} from "../user-search/user-search";

@NgModule({
  declarations: [
    ContactPage,
    UserSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    IonicPageModule.forChild(UserSearchPage),
  ],
  entryComponents: [
    ContactPage,
    UserSearchPage,
  ],

})
export class ContactPageModule {}
