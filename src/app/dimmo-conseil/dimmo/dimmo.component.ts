import { Component, OnInit, HostListener } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import { ChoixService } from '../audio/new-choix/choix.service';
import { Message } from '../audio/new-choix/message.model';

@Component({
  selector: 'app-dimmo',
  templateUrl: './dimmo.component.html',
  styleUrls: ['./dimmo.component.scss'],
})
export class DimmoComponent implements OnInit {
  apropos = true;
  contact = false;
  actionSheet: any;
  nbOpportunités: number;
  contactForm: FormGroup;
  disabledSubmitButton = true;
  optionsSelect: Array<any>;
  clef = '';

  // @HostListener('input') oninput() {

  //   if (this.contactForm.valid) {
  //     this.disabledSubmitButton = false;
  //     }
  //   }
  formGroup: FormGroup;

  constructor(public actionSheetController: ActionSheetController,
              public router: Router,
              private fb: FormBuilder,
              private choixService: ChoixService,
              public toastController: ToastController,
              public loadingController: LoadingController) {
                // this.contactForm = fb.group({
                //   'contactFormName': ['', Validators.required],
                //   'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
                //   'contactFormSubjects': ['', Validators.required],
                //   'contactFormMessage': ['', Validators.required],
                //   'contactFormCopy': [''],
                //   }
                //   );
              }

    ngOnInit() {
    console.log(localStorage.getItem('clef'));
    this.formGroup = new FormGroup({
      nom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      prenom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      sujet: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      nousecrire: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    this.loadingController
      .create({
        message: 'Prise en charge de votre message ...'})
      .then(loadingEl => {
        loadingEl.present();
        this.choixService.addMessage(new Message('', this.formGroup.value.nom,
         this.formGroup.value.prenom, this.formGroup.value.sujet, this.formGroup.value.nousecrire, null)).subscribe(() => {
          loadingEl.dismiss();
        }
          );
        this.formGroup.reset();
        this.presentToast();
      });

    }
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Nous vous remercions et vous recontacterons très rapidement',
        duration: 4000
      });
      toast.present();
    }


  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'apropos') {
      this.apropos = true;
      this.contact = false;
      // this.relevantPlaces = this.loadedPlaces;
      // this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      console.log(' ....');
      this.apropos = false;
      this.contact = true;
      // this.relevantPlaces = this.loadedPlaces.filter(
      //   place => place.userId !== this.authService.userId
      // );
      // this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }
  onChange(region) {
    this.nbOpportunités = 8;

    this.actionSheet = this.actionSheetController.create({
      header: region,
      cssClass: 'my-actionsheet',
      buttons: [{
        text: 'Nous avons ' + this.nbOpportunités + '  opportunités dans cette région',
        role: 'destructive',
        icon: 'heart',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Nous nous engageons',
        icon: 'arrow-dropright-circle',
        handler: () => {
          this.onEnSaoirPlus();
        }
      }, {
        text: 'Chercher des opportunités',
        icon: 'search',
        handler: () => {
          this.onChercherDesOpportunites();
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }

  onChercherDesOpportunites() {
    this.router.navigate(['/dimmo-conseil/tabs/audio/new']);
  }

  onEnSaoirPlus() {
    this.router.navigate(['/dimmo-conseil/tabs/audio/ensavoir-plus']);
  }
}
