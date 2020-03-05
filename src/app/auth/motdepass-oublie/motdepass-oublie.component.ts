import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-motdepass-oublie',
  templateUrl: './motdepass-oublie.component.html',
  styleUrls: ['./motdepass-oublie.component.scss'],
})
export class MotdepassOublieComponent implements OnInit {

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'connexion au serveur...' })
      .then(loadingEl => {
        loadingEl.present();
            loadingEl.dismiss();
            let message = 'Nous ne pouvons pas vous contacter en ce moment, nous vous prions de reessayer plutard.';
            this.showAlert(message);
          })
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
