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
  quatriemeFormGroup: FormGroup;
  isEditable = false;

  choix: Choix;
  choixId: string;
  form: FormGroup;
  isLoading = false;
  private choixSub: Subscription;

  regionChoisie = 'no';
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
    this.thirdFormGroup = new FormGroup({
      enseignesNon: new FormControl(null, {
        updateOn: 'blur'
      })
    });
    this.quatriemeFormGroup = new FormGroup ({
      joursContact: new FormControl(null, {
        updateOn: 'blur'
      }),
      momentsContact: new FormControl(null, {
        updateOn: 'blur'
      }),
      telephone: new FormControl(null, {
        updateOn: 'blur'
      })
    });
    this.secondFormGroup = new FormGroup({
      localite: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      region: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      departement: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
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
  public ontechnicienCdi() {
    console.log('technicienCdi: ' + this.technicienCdi);
  }
  public ontechnicienCdd() {
    console.log('technicienCdd: ' + this.technicienCdd);
  }
  onSubmitt() {
    this.choix = new Choix(
    this.choixId,
    this.choix.userId,
    this.resRegionCdd,
    this.resRegionCdi,
    this.audioCdd,
    this.audioCdi,
    this.audiodVolant,
    this.assistantAudioCdd,
    this.assistantAudioCdi,
    this.technicienCdd,
    this.technicienCdi,
    this.regionChoisie,
    this.secondFormGroup.value.departement,
    this.secondFormGroup.value.localite,
    this.thirdFormGroup.value.enseignesNon,
    this.quatriemeFormGroup.value.joursContact,
    this.quatriemeFormGroup.value.momentsContact,
    null,
    null);
    this.router.navigate(['/dimmo-conseil/tabs/audio']);

    this.loadingCtrl
      .create({
        message: 'Modification des critères du choix ...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.choixService
          .updateChoix(
            this.choix
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/dimmo-conseil/tabs/audio']);
            location.reload();
          });
      });
  }

  ngOnDestroy() {
    if (this.choixSub) {
      this.choixSub.unsubscribe();
    }
  }
  onAddDepartement(){
    console.log('ajouter departement');
  }

}
