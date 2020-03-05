import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, WebPlugin } from '@capacitor/core';

// import {MyPlugin} from "capacitor-myplugin";
import { Email } from '@teamhive/capacitor-email';
import {registerWebPlugin} from "@capacitor/core";

import {FileSharer} from '@byteowls/capacitor-filesharer';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { registerLocaleData } from '@angular/common';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userRoleAdmin = false;
  userRoleUser = false;
  Email: WebPlugin;
  userSubs: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
  ) {
    this.initializeApp();
    
  }

  ngOnInit() {

    // this.authService._user.subscribe(persone => {
    //   console.log("le email du user ........"+persone.email);
    // } )

    if(localStorage.getItem('clefAdmin') === 'admin'){
      this.userRoleAdmin = true;
    }
    if(localStorage.getItem('clefUser') === 'user'){
      this.userRoleUser = true;
      return;
    }
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      registerLocaleData(Email);
      // registerWebPlugin(this.Email);
      // registerWebPlugin(FileSharer);    
      // location.reload();
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    location.reload();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onRafraichir(){
    location.reload();
  }
}
