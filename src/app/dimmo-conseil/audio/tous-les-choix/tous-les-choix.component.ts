import { Component, OnInit } from '@angular/core';
import { Choix } from '../new-choix/choix.model';
import { Subscription } from 'rxjs';
import { ChoixService } from '../new-choix/choix.service';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-tous-les-choix',
  templateUrl: './tous-les-choix.component.html',
  styleUrls: ['./tous-les-choix.component.scss'],
})
export class TousLesChoixComponent implements OnInit {

  choix: Choix [];
  isLoading = false;
  private choixSub: Subscription;
  userLoged = false;

  constructor(private choixService: ChoixService, private router: Router) { }

  ngOnInit() {
    // console.log('le userId est: ' + localStorage.getItem('userId'));
    this.choixSub = this.choixService.Choix.subscribe(choix => {
      this.choix = choix;
      this.choix.forEach(element => {
        console.log('le userId du choix: ' + element.userId)
        console.log('le userId storage: ' + localStorage.getItem('userId'));
        if (element.userId === localStorage.getItem('userId')) {
          console.log('CECI EST UN CHOIX DE LUTILISATEUR CONNECTE')
        }
      });
    });
    if (localStorage.getItem('clefUser') === 'user'){
      this.userLoged = true;
    }
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