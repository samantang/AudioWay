import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChoixService } from './new-choix/choix.service';
import { Router } from '@angular/router';
import { Choix } from './new-choix/choix.model';
import { IonItemSliding } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {

  choixSub: Subscription;
  choix: Choix [];
  mesChoix : Choix [] = [];
  isLoading = false;
  // '', '', true, true, true, true, true, true, true, true, true, '', '', '', null, null, null, null
  opportunitesSub: Subscription;
  unChoix: Choix [];

  constructor(private choixService: ChoixService, private router: Router, private authSvce: AuthService) { }

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
    this.choixService.deleteChoix(choixId).subscribe(() =>{
      location.reload();
    });
   }

}
