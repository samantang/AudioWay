import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { Email } from '@teamhive/capacitor-email';

import { AuthService, AuthResponseData } from './auth.service';
import { NewChoixComponent } from '../dimmo-conseil/audio/new-choix/new-choix.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = false;
  inscription = true;
  tel: number;
  email: Email;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private newChoixComponent: NewChoixComponent
  ) {}

  ngOnInit() {
    this.email = new Email();
    if(localStorage.getItem('clefUser') === 'user') {
      this.router.navigateByUrl('/dimmo-conseil/tabs/dimmo');
    }
  }

  authenticate(email: string, password: string) {
    // this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'connexion...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
          // this.inscription = true;
        }
        authObs.subscribe(
          resData => {
            // si c'est une inscription, alors il faut récupérer l'id et aller finir la page newChoix
            if( this.inscription){
              // console.log('cest une inscription +++++++++++++++++++++++++++++++++++++++');
              this.newChoixComponent.onFinirInscription(resData.localId, this.tel);
            }
            localStorage.setItem('userId', resData.localId);
            
            // si c'est un utilisateur admin, alors on rajoute le role admin au localStorage
            if(resData.email === 'salioubahdiallo@gmail.com' || resData.email === 'aliou.bah@dimmo-conseil.com || resData.email === info@dimmo-conseil.com'){
              localStorage.setItem('clefAdmin', 'admin');
              localStorage.setItem('clefUser', 'user');
            } else {
              localStorage.setItem('clefUser', 'user');
            }
            // console.log(resData);
            // this.isLoading = false;
            loadingEl.dismiss();
            // this.router.navigate(['/dimmo-conseil']);
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Nous ne pouvons pas vous connecter en ce moment, nous vous prions de reessayer plutard.';
            if (code === 'EMAIL_EXISTS') {
              message = 'Cette adresse email existe  dejà!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'Nous n\'avons pas trouvé ce email.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Le mot de passe est incorrect.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'La connexion a échoué',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
