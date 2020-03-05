import { Component, OnInit, Input } from '@angular/core';
import { Choix } from '../../new-choix/choix.model';
import { ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChoixService } from '../../new-choix/choix.service';

@Component({
  selector: 'app-mes-choix-item',
  templateUrl: './mes-choix-item.component.html',
  styleUrls: ['./mes-choix-item.component.scss'],
})
export class MesChoixItemComponent implements OnInit {

  @Input() choix: Choix;
  lePoste = '';
  enseignesNon = '';
  lePosteResRegion = '';
  lePosteAudio = '';
  lePosteAssistant = '';

  public resRegionCdd = '';
  public resRegionCdi = '';
  public audioCdd = '';
  public audioCdi = '';
  public audiodVolant = '';
  public assistantAudioCdd =  '';
  public assistantAudioCdi = '';

  constructor(public toastController: ToastController,
              public actionSheetController: ActionSheetController,
              public router: Router,
              public alertController: AlertController,
              public choixService: ChoixService) {}

  ngOnInit() {
   if(this.choix.assistantAudioCdd === true ) {
     this.lePoste = this.lePoste + 'Assistant Audio en CDD';
     this.lePosteAssistant = this.lePosteAssistant + 'Assistant Audio en CDD';
    }
   if(this.choix.assistantAudioCdi === true ) {
    this.lePoste = this.lePoste + ' Assistant Audio en CDI';
    this.lePosteAssistant = this.lePosteAssistant + ' Assistant Audio en CDI';
    }
   if(this.choix.audioCdd === true ) {
    this.lePoste = this.lePoste + ' Audio en CDD';
    this.lePosteAudio = this.lePosteAudio + ' Audio en CDD';
    }
   if(this.choix.audioCdi === true ) {
    this.lePoste = this.lePoste + ' Audio en CDI';
    this.lePosteAudio = this.lePosteAudio + ' Audio en CDI';
    }
   if(this.choix.audioVolant === true ) {
    this.lePoste = this.lePoste + ' Audio Volant';
    this.lePosteAudio = this.lePosteAudio + ' Audio Volant';
    }
   if(this.choix.resRegionCdd === true ){
    this.lePoste = this.lePoste + ' Resp Region en CDD';
    this.lePosteResRegion = this.lePosteResRegion + ' Resp Region en CDD';
  }
   if(this.choix.resRegionCdi === true ) {
    this.lePoste = this.lePoste + ' Resp Region en CDI';
    this.lePosteResRegion = this.lePosteResRegion + ' Resp Region en CDI';
    }
    // si la liste des enseignes indésirables est vide
    // if(this.choix.enseignesNon = 0){
    //   console.log('pas denseinges NON ;;;;;;');
    // }
  }

  async presentActionSheetDetailChoix() {
    const actionSheet = await this.actionSheetController.create({
      header: ' DÉTAILS DE CE CRITERE DE CHOIX',
      cssClass: 'my-actionsheet',
      buttons: [{
        text: this.choix.localite +'  => '+ this.choix.region ,
        // role: 'destructive',
        icon: 'business',
        handler: () => {
          console.log('Localite');
        }
      }, {
        text: this.lePoste,
        icon: 'done-all',
        handler: () => {
          console.log('lePoste');
        }
      // }, {
      //   text: this.choix.region,
      //   icon: 'done-all',
      //   handler: () => {
      //     console.log('Assistant');
      //   }
      },
      //  {
      //   text: ''+this.choix.telephone+'',
      //   icon: 'call',
      //   handler: () => {
      //     console.log('Res Region');
      //   }
      // }, 
      {
        text: 'PLUS DE DÉTAILS SUR LE CRITERE DE CHOIX',
        icon: 'more',
        handler: () => {
          this.onDetailsChoix();
        }
      },
      {
        text: 'MODIFIER LE CHOIX',
        icon: 'switch',
        handler: () => {
          this.onEditChoix();
        }
      },
      {
        text: 'SUPPRIMER CE CHOIX',
        icon: 'trash',
        role: 'trash',
        handler: () => {
          this.onDeleteChoix();
        }
      }]
    });
    await actionSheet.present();
  }
  
  onEditChoix(){
    this.router.navigate(['/', 'dimmo-conseil', 'tabs', 'audio', 'edit', this.choix.id]);
  }
  onDetailsChoix(){
    this.router.navigate(['/', 'dimmo-conseil', 'tabs', 'audio', 'details', this.choix.id]);
  }
  onDeleteChoix(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Suppression du choix',
      message: 'Voulez-vous Vraiment <strong>supprimer</strong> ce critère de choix ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui supprimer',
          handler: () => {
            this.choixService.deleteChoix(this.choix.id).subscribe(() =>{
            location.reload();
          });
          }
        }
      ]
    });

    await alert.present();
  }

}
