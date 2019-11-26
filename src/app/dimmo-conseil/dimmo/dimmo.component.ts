import { Component, OnInit, HostListener } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';

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
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;
  clef = '';

  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
      }
    }

  constructor(public actionSheetController: ActionSheetController,
              public router: Router,
              private fb: FormBuilder) { 
                // location.reload();
                this.contactForm = fb.group({
                  'contactFormName': ['', Validators.required],
                  'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
                  'contactFormSubjects': ['', Validators.required],
                  'contactFormMessage': ['', Validators.required],
                  'contactFormCopy': [''],
                  });
              }

  onSubmit() {
    console.log('onSubmit ....... ');
    // this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
    // alert('Your message has been sent.');
    // this.contactForm.reset();
    // this.disabledSubmitButton = true;
    //             }, error => {
    //               console.log('Error', error);
    //             });
    }

  ngOnInit() {
    console.log(localStorage.getItem('clef'));
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
      },{
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
