import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Choix } from '../new-choix/choix.model';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoixService } from '../new-choix/choix.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-edit-choix',
  templateUrl: './edit-choix.component.html',
  styleUrls: ['./edit-choix.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class EditChoixComponent implements OnInit {
  @ViewChild('f', {static: false}) signUpForm: NgForm;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  choix: Choix;
  choixId: string;
  form: FormGroup;
  isLoading = false;
  private choixSub: Subscription;

  regionChoisie: '';
      public resRegionCdd: boolean;
      public resRegionCdi: boolean;
      public audioCdd: boolean;
      public audioCdi: boolean;
      public audiodVolant: boolean;
      public assistantAudioCdd: boolean;
      public assistantAudioCdi: boolean;
      public technicienCdd: boolean;
      public technicienCdi: boolean;
      public enseignesNon: [];
      public enseignesOk: [];

  constructor(
    private route: ActivatedRoute,
    private choixService: ChoixService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: []
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: []
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtr: []
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: []
    });

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('choixId')) {
        this.navCtrl.navigateBack('/dimmo-conseil/tabs/audio');
        return;
      }
      this.choixId = paramMap.get('choixId');
      this.isLoading = true;
      this.choixSub = this.choixService
        .getChoix(paramMap.get('choixId'))
        .subscribe(
          choix => {
            this.choix = choix;
            this.form = new FormGroup({
              localite: new FormControl(this.choix.localite, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              region: new FormControl(this.choix.region, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
              })
            });
            this.isLoading = false;
            // console.log(this.choix.resRegionCdi);
            // if(this.choix.resRegionCdi === true){
            //   console.log('le resRegional est true');
            // }
          },
          error => {
            this.alertCtrl
              .create({
                header: 'Une erreur s est produite!',
                message: 'Le Choix ne peut pas etre recuperer, merci de réessayer.',
                buttons: [
                  {
                    text: 'Daccord',
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
  onChange(region){
    this.regionChoisie = region;
  }
  public onresRegionCdd() {
    console.log('onresRegionCdd: ' + this.resRegionCdd);
  }
  public onresRegionCdi() {
    console.log('onresRegionCdi: ' + this.resRegionCdi);
  }
  public onaudioCdd() {
    console.log('audioCdd: ' + this.audioCdd);
  }
  public onaudioCdi() {
    console.log('audioCdi: ' + this.audioCdi);
  }
  public onaudioVolant() {
    console.log('audioVolant: ' + this.audiodVolant);
  }
  public onassistantAudioCdd() {
    console.log('assistantAudioCdd: ' + this.assistantAudioCdd);
  }
  public onassistantAudioCdi() {
    console.log('assistantAudioCdi: ' + this.assistantAudioCdi);
  }
  onSubmit(form: NgForm) {
    this.choix = new Choix(
      'id',
    'userId',
    this.resRegionCdd,
    this.resRegionCdi,
    this.audioCdd,
    this.audioCdi,
    this.audiodVolant,
    this.assistantAudioCdd,
    this.assistantAudioCdi,
    this.technicienCdd,
    this.technicienCdi,
    this.signUpForm.value.region,
    this.signUpForm.value.departement,
    this.signUpForm.value.localite,
    this.signUpForm.value.enseignesNon,
    this.signUpForm.value.jourContact,
    this.signUpForm.value.momentContact,
    null);;
    // if (!this.form.valid) {
    //   return;
    // }
    console.log('ResRegionCdi: ' + this.choix.resRegionCdi);
    console.log('la loc: ' + this.signUpForm.value.localite);
    console.log('la region: ' + this.regionChoisie);
    console.log('la date: ' + this.signUpForm.value.date);
    console.log('les enseinges Ok: ' + this.signUpForm.value.enseignesOk);
    console.log('les enseignes Non: ' + this.signUpForm.value.enseignesNon);
    this.router.navigate(['/dimmo-conseil/tabs/audio']);


    // this.loadingCtrl
    //   .create({
    //     message: 'Modification du choix ...'
    //   })
    //   .then(loadingEl => {
    //     loadingEl.present();
    //     this.choixService
    //       .updateChoix(
    //         this.choix
    //       )
    //       .subscribe(() => {
    //         loadingEl.dismiss();
    //         this.form.reset();
    //         this.router.navigate(['/dimmo-conseil/tabs/audio']);
    //       });
    //   });
  }

  ngOnDestroy() {
    if (this.choixSub) {
      this.choixSub.unsubscribe();
    }
  }

}
