import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm , FormBuilder} from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Subscription } from 'rxjs';
import { ChoixService } from '../new-choix/choix.service';
import { Opportunite } from './Opportunite.model';

@Component({
  selector: 'app-new-opportunite',
  templateUrl: './new-opportunite.component.html',
  styleUrls: ['./new-opportunite.component.scss'],
})
export class NewOpportuniteComponent implements OnInit {

  formGroup: FormGroup;
  region: '';
  opportunite: Opportunite;
  opportunitesSub: Subscription;
  nbOpp = 0;
  opportunites: Opportunite [];


  constructor(private choixService: ChoixService, private loadingCtrl: LoadingController, private router: Router,
    public navCtrl: NavController,) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      region: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      nbOpportunites: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      detailsPoste: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });

    this.opportunitesSub = this.choixService.fetchOpportunites().subscribe(opp => {      
      this.opportunites = opp;
      console.log('la longeur ... ' + this.opportunites.length)
      this.opportunites.forEach(element => {
        if(element.region === 'Grand Est'){
          this.nbOpp ++
        }
        console.log(this.nbOpp)
      });
    });
  }

  onChange(region){
    this.region = region;
  }

  onSubmit(){
    console.log(this.region + ' '+this.formGroup.value.nbOpportunites + '' + this.formGroup.value.detailsPoste)
    this.opportunite = new Opportunite(null, null, '', this.region, this.formGroup.value.nbOpportunites, this.formGroup.value.detailsPoste, null);
    // this.choixService.addOpportunite(this.opportunite).subscribe
    this.loadingCtrl
          .create({
            message: 'Ajout de l\'opportunite ...'})
          .then(loadingEl => {
            loadingEl.present();
            this.choixService.addOpportunite(this.opportunite).subscribe(() => {
              loadingEl.dismiss();
              this.router.navigate(['/dimmo-conseil/tabs/dimmo']);
            }
              );
          });
  }

}
