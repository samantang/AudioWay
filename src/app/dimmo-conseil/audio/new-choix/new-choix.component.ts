import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm , FormBuilder} from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Choix } from './choix.model';
import { ChoixService } from './choix.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';


@Component({
  selector: 'app-new-choix',
  templateUrl: './new-choix.component.html',
  styleUrls: ['./new-choix.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class NewChoixComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  quatriemeFormGroup: FormGroup;
  isEditable = false;

@ViewChild('f', {static: false}) signUpForm: NgForm;

  regionChoisie = 'no';
  form: FormGroup;
  choix: Choix = new Choix('','',false, false, false, false, false, false, false, false, false, '', '', '', null, null, null, null );
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

  constructor(private choixService: ChoixService,
              private loadingCtrl: LoadingController,
              private router: Router,
              public navCtrl: NavController,
              private _formBuilder: FormBuilder,
              private alertCtrl: AlertController
              ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: []
    });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: [] enseignesNon
    // });
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
  }

  onChange(region){
    console.log('la region choisie est: ' + region);
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
  public ontechnicienCdd() {
    console.log('technicienCdd: ' + this.technicienCdd);
  }
  public ontechnicienCdi() {
    console.log('technicienCdi: ' + this.technicienCdi);
  }

  onSubmitt() {
     // si il n'a pas choisit de poste
     if( !this.resRegionCdd && !this.resRegionCdi && !this.audioCdd && !this.audioCdi
      && !this.audiodVolant && !this.assistantAudioCdd && !this.assistantAudioCdi
      && !this.technicienCdd && !this.technicienCdi){
       this.presentAlertPosteConfirm();
       return;
     }
    //  si le lieu de travail n'est pas renseigné
     if( this.regionChoisie === 'no') {
      this.presentAlertLieuDeTravailConfirm();
      return;
     }
     this.choix = new Choix(
    'id',
    localStorage.getItem('userId'),
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
    null);


     this.storeChoixData(this.resRegionCdd, this.resRegionCdi, this.audioCdd, this.audioCdi,
      this.audiodVolant, this.assistantAudioCdd, this.assistantAudioCdi, this.technicienCdd,
      this.technicienCdi, this.regionChoisie, this.secondFormGroup.value.departement, this.secondFormGroup.value.localite,
      this.thirdFormGroup.value.enseignesNon, this.quatriemeFormGroup.value.joursContact,
      this.quatriemeFormGroup.value.momenstContact, null);
    // this.signUpForm.reset();

    // s'il ya dejà une personne connectée, alors on recupère son ID q'uon rajoute au choix avant de finir
     if(localStorage.getItem("clefUser")){
        this.choix.userId = localStorage.getItem('userId');
        this.loadingCtrl
          .create({
            message: 'Personnalisation de vos choix ...'})
          .then(loadingEl => {
            loadingEl.present();
            this.choixService.addChoix(this.choix).subscribe(() => {
              loadingEl.dismiss();
              this.router.navigate(['/dimmo-conseil/tabs/dimmo']);
            }
              );
          });
    } else {

      console.log('personne est connecté actuellement ...');
      this.presentAlerInscriptiontPrompt();
    }
    // this.presentAlerInscriptiontPrompt();

    // this.loadingCtrl
    //   .create({
    //     message: 'Personnalisation de vos choix ...'})
    //   .then(loadingEl => {
    //     loadingEl.present();
    //     this.choixService.addChoix(this.choix).subscribe(() => {
    //       loadingEl.dismiss();
    //     }
    //       );
    //   });
  }
  private storeChoixData(
    resRegionCdd: boolean,
    resRegionCdi: boolean,
    audioCdd: boolean,
    audioCdi: boolean,
    audioVolant: boolean,
    assistantAudioCdd: boolean,
    assistantAudioCdi: boolean,
    technicienCdd: boolean,
    technicienCdi: boolean,
    region: string,
    departement: string,
    localite: string,
    enseignesNon: string [],
    joursContact: string [],
    momentsContact: string [],
    dateCreation: Date
  ) {
    const data = JSON.stringify({
      resRegionCdd,
      resRegionCdi,
      audioCdd,
      audioCdi,
      audioVolant,
      assistantAudioCdd,
      assistantAudioCdi,
      technicienCdd,
      technicienCdi,
      region,
      departement,
      localite,
      enseignesNon,
      joursContact,
      momentsContact,
      dateCreation
    });
    Plugins.Storage.set({ key: 'choixData', value: data });
  }
  selectChange(e) {
    console.log(e);
  }
  onFinirInscription (localId: string, tel: number) {
    this.getChoix(localId).subscribe(() => {});
    this.loadingCtrl
      .create({
        message: 'Personnalisation de vos choix ...'})
      .then(loadingEl => {
        loadingEl.present();
        this.choixService.addChoix(this.choix).subscribe(() => {
          loadingEl.dismiss();
        }
          );
      });
  }
  getChoix(localId: string) {
    return from(Plugins.Storage.get({ key: 'choixData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          resRegionCdd: boolean,
          resRegionCdi: boolean,
          audioCdd: boolean,
          audioCdi: boolean,
          audioVolant: boolean,
          assistantAudioCdd: boolean,
          assistantAudioCdi: boolean,
          technicienCdd: boolean,
          technicienCdi: boolean,
          region: string,
          departement: string,
          localite: string,
          enseignesNon: [],
          joursContact: string [],
          momentsContact: string[]
        };
        // const expirationTime = new Date(parsedData.tokenExpirationDate);
        // if (expirationTime <= new Date()) {
        //   return null;
        // }
        const choix = new Choix(
          '',
          localId,
          parsedData.resRegionCdd,
          parsedData.resRegionCdi,
          parsedData.audioCdd,
          parsedData.audioCdi,
          parsedData.audioVolant,
          parsedData.assistantAudioCdd,
          parsedData.assistantAudioCdi,
          parsedData.technicienCdd,
          parsedData.technicienCdi,
          parsedData.region,
          parsedData.departement,
          parsedData.localite,
          parsedData.enseignesNon,
          parsedData.joursContact,
          parsedData.momentsContact,
          new Date()
        );
        this.choix = choix;
        return choix;
      }),
      tap(choix => {
        if (choix) {
          // this.choix = choix;
          // this._user.next(user);
          // this.autoLogout(user.tokenDuration);
        }
      }),
      map(choix => {
        return !!choix;
      })
    );
  }
  async presentAlerInscriptiontPrompt() {
    this.router.navigate(['/auth']);

  }
  async presentAlertPosteConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Le POSTE SOUHAITE!',
      message: '<strong>Merci de choisir au moins un poste</strong>',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertLieuDeTravailConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Le LIEU DE TRAVAIL SOUHAITE!',
      message: '<strong>Merci de choisir une région</strong>',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
