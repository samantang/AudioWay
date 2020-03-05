import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ChoixService } from '../new-choix/choix.service';
import { Choix } from '../new-choix/choix.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-choix',
  templateUrl: './mes-choix.component.html',
  styleUrls: ['./mes-choix.component.scss'],
})
export class MesChoixComponent implements OnInit {
  choixSub: Subscription;
  choix: Choix [];
  mesChoix : Choix [] = [];
  isLoading = false;
  // '', '', true, true, true, true, true, true, true, true, true, '', '', '', null, null, null, null

  constructor(private choixService: ChoixService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.choixSub = this.choixService.fetchChoix().subscribe(choix => {
      this.choix = choix;
      this.choix.forEach(element => {
        console.log('le userId du choix: ' + element.userId)
        console.log('le userId storage: ' + localStorage.getItem('userId'));
        if (element.userId === localStorage.getItem('userId')) {
          console.log('CECI EST UN CHOIX DE LUTILISATEUR CONNECTE')
          this.mesChoix.push(element)
          // if (!this.mesChoix) {
          //   console.log('il ya rien dans mesChoix')
          //   this.mesChoix.push(element)    
          // } else {
            
          // }
        }
      });
    });
  }
  ionViewWillEnter(){
    this.isLoading = true;
    this.choixService.fetchChoix().subscribe(() => {
     //  this.isLoading = false;
    });
   }
 
   ngOnDestroy () {
     if(this.choixSub){
       this.choixSub.unsubscribe();
     }
   }
 
   onEdit(choixId: string, slidingItem: IonItemSliding) {
     slidingItem.close();
     this.router.navigate(['/', 'dimmo-conseil', 'tabs', 'audio', 'edit', choixId]);
     console.log('Editing item', choixId);
   }

   onDelete(choixId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.presentAlertConfirm(choixId);
    // this.choixService.deleteChoix(choixId).subscribe(() =>{
    //   location.reload();
    // });
   }

   async presentAlertConfirm(choixId: string) {
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
            this.choixService.deleteChoix(choixId).subscribe(() =>{
            location.reload();
          });
          }
        }
      ]
    });

    await alert.present();
  }

}
