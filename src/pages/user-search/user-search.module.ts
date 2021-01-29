import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchPage } from './user-search';
import {ContactPage} from "../contact/contact";


@NgModule({
  declarations: [
    UserSearchPage,
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSearchPage),
  ],
})
export class UserSearchPageModule {}
