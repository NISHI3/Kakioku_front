import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ListPage } from '../pages/list/list';
import { ListinfoPage } from '../pages/listinfo/listinfo';
import { CreateLetterPage } from '../pages/create-letter/create-letter';
import { OtherPage } from '../pages/other/other';
import {UserSearchPage} from "../pages/user-search/user-search";
import {ContactPage} from "../pages/contact/contact";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListinfoPage,
    CreateLetterPage,
    OtherPage,
    UserSearchPage,
    ContactPage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListinfoPage,
    CreateLetterPage,
    OtherPage,
    UserSearchPage,
    ContactPage,
    SignupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider
  ]
})
export class AppModule { }
