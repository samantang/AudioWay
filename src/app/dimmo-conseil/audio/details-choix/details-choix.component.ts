import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoixService } from '../new-choix/choix.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Choix } from '../new-choix/choix.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-choix',
  templateUrl: './details-choix.component.html',
  styleUrls: ['./details-choix.component.scss'],
})
export class DetailsChoixComponent implements OnInit {

  choix: Choix = new Choix('','',false, false, false, false, false, false, false, false, false, '', '', '', null, null, null, null, null );
  choixId: string;
  form: FormGroup;
  // isLoading = false;
  private choixSub: Subscription;

  constructor(private route: ActivatedRoute,
              private choixService: ChoixService,
              private navCtrl: NavController,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private _formBuilder: FormBuilder) { 
                
              }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('choixId')) {
        this.navCtrl.navigateBack('/dimmo-conseil/tabs/audio');
        return;
      }
      this.choixId = paramMap.get('choixId');
      // this.isLoading = true;
      this.choixSub = this.choixService
        .getChoix(paramMap.get('choixId'))
        .subscribe(
          choix => {
            this.choix = choix;
            console.log('le Id du choix est: ' +this.choix.id);
            // this.form = new FormGroup({
            //   localite: new FormControl(this.choix.localite, {
            //     updateOn: 'blur',
            //     validators: [Validators.required]
            //   }),
            //   region: new FormControl(this.choix.region, {
            //     updateOn: 'blur',
            //     validators: [Validators.required, Validators.maxLength(180)]
            //   })
            // });
            // this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'Une erreur s\'est produite!',
                message: 'Le Choix ne peut pas etre recuperer, merci de réessayer.',
                buttons: [
                  {
                    text: 'D\'accord',
                    handler: () => {
                      this.router.navigate(['/dimmo-conseil/tabs/audio']);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
  }

  onEditChoix(){
    this.router.navigate(['/', 'dimmo-conseil', 'tabs', 'audio', 'edit', this.choix.id]);
  }

}
