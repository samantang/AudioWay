import { Component, OnInit, HostListener } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import { ChoixService } from '../audio/new-choix/choix.service';
import { Message } from '../audio/new-choix/message.model';
import { Subscription } from 'rxjs';
import { Opportunite } from '../audio/new-opportunite/Opportunite.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/auth/user.model';


@Component({
  selector: 'app-dimmo',
  templateUrl: './dimmo.component.html',
  styleUrls: ['./dimmo.component.scss'],
})
export class DimmoComponent implements OnInit {
  apropos = true;
  contact = false;
  actionSheet: any;
  nbOpportunités = 6;
  contactForm: FormGroup;
  disabledSubmitButton = true;
  optionsSelect: Array<any>;
  clef = '';
  opportunitesSub: Subscription;
  opportunites: Opportunite [];
  regionChoisie = '';
  us: User;

  
  signupForm: FormGroup;

  constructor(public actionSheetController: ActionSheetController,
              public router: Router,
              private fb: FormBuilder,
              private choixService: ChoixService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public authService: AuthService) {
              }

    ngOnInit() {
      this.opportunitesSub = this.authService._user.subscribe(persone => {
        this.us = persone;
      } )
    //   console.log(Plugins.Storage.get({key:'authData'}));  
    // console.log(localStorage.getItem('clef'));
    this.opportunitesSub = this.choixService.fetchChoix().subscribe(unChoix => {
    })
    this.signupForm = new FormGroup({
      nom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(3)]
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
        validators: [Validators.required, Validators.minLength(10)]
      })
    });
    this.onOuvrir();
  }

  onSubmit() {
    this.loadingController
      .create({
        message: 'Prise en charge de votre message ...'})
      .then(loadingEl => {
        loadingEl.present();
        this.choixService.addMessage(new Message('', this.signupForm.value.nom,
         this.signupForm.value.prenom, this.signupForm.value.sujet, this.signupForm.value.nousecrire, null)).subscribe(() => {
          loadingEl.dismiss();
        }
          );
        this.signupForm.reset();
        this.presentToast();
      });

    }
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Nous vous remercions et vous recontacterons très rapidement',
        duration: 6000
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
    this.regionChoisie = region;
    // recherche le nomnbre d'opportunités pour la région sélectionnée
    // this.opportunitesSub = this.choixService.fetchOpportunites().subscribe(opp => {      
    //   this.opportunites = opp;
    //   console.log('la longeur ... ' + this.opportunites.length)
    //   this.opportunites.forEach(element => {
    //     if(element.region === region){
    //       this.nbOpportunités ++;
    //     }
    //     console.log(this.nbOpportunités)
    //   });
    // });
    if (region == 'Auvergne-Rhone-Alpes') {
      this.nbOpportunités = 7;
    }
    else if (region == 'Bourgogne-Franche-Comte') {
      this.nbOpportunités = 3;
    }
    else if (region == 'Bretagne') {
      this.nbOpportunités = 1;    
    }
    else if (region == 'Centre-Val de Loire') {
      this.nbOpportunités = 5;
    }
    else if (region == 'Corse') {
      this.nbOpportunités = 1;
    }
    else if (region == 'Grand Est') {
      this.nbOpportunités = 4;
    }
    else if (region == 'Hauts-de-France') {
      this.nbOpportunités = 2;
    }
    else if (region == 'Ile-de-France') {
      this.nbOpportunités = 2;
    }
    else if (region == 'Normandie') {
      this.nbOpportunités = 6;
    }
    else if (region == 'Nouvelle-Aquitaine') {
      this.nbOpportunités = 10;
    }
    else if (region == 'Occitanie') {
      this.nbOpportunités = 3;
    }
    else if (region == 'Pays de la Loire') {
      this.nbOpportunités = 6;
    }
    else {
      this.nbOpportunités = 4;
    };

    this.actionSheet = this.actionSheetController.create({
      header: 'Nous avons ' + this.nbOpportunités + '  opportunités en ' + region,
      cssClass: 'my-actionsheet',
      buttons: [
      {
        text: 'Cherchez des opportunités dans la region ',
        icon: 'search',
        handler: () => {
          this.onChercherDesOpportunites();
          this.nbOpportunités = 3;
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.nbOpportunités = 3;
        }
      }]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }

  onChercherDesOpportunites() {
    console.log('la regionChoisie est: ' +this.regionChoisie)
    this.router.navigate(['/dimmo-conseil/tabs/audio/new', this.regionChoisie]);
  }

  onEnSaoirPlus() {
    this.router.navigate(['/dimmo-conseil/tabs/audio/comment-ca-marche']);
  }
  onOuvrir(){
    // location.reload();
    return;
  }
}
