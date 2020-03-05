import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Choix } from '../../new-choix/choix.model';

@Component({
  selector: 'app-tous-les-choix-item',
  templateUrl: './tous-les-choix-item.component.html',
  styleUrls: ['./tous-les-choix-item.component.scss'],
})
export class TousLesChoixItemComponent implements OnInit {

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
              public router: Router) {}

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
      header: ' Détails de Votre choix',
      cssClass: 'my-actionsheet',
      buttons: [{
        text: this.choix.localite +' '+ this.choix.region ,
        // role: 'destructive',
        icon: 'business',
        handler: () => {
          console.log('Localite');
        }
      }, {
        text: this.lePosteAudio,
        icon: 'done-all',
        handler: () => {
          console.log('audio');
        }
      }, {
        text: this.lePosteAssistant,
        icon: 'done-all',
        handler: () => {
          console.log('Assistant');
        }
      }, {
        text: this.lePosteResRegion,
        icon: 'done-all',
        handler: () => {
          console.log('Res Region');
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
        text: 'Supprimer ce choix',
        icon: 'trash',
        role: 'trash',
        handler: () => {
          this.onDeleteChoix();
        }
      }]
    });
    await actionSheet.present();
  }
  onDeleteChoix(){}
  onEditChoix(){
    this.router.navigate(['/', 'dimmo-conseil', 'tabs', 'audio', 'edit', this.choix.id]);
  }

}
