import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChoixService } from './new-choix/choix.service';
import { Router } from '@angular/router';
import { Choix } from './new-choix/choix.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {

  choix: Choix [];
  isLoading = false;
  private choixSub: Subscription;
  userLoged = false;

  constructor(private choixService: ChoixService, private router: Router) { }

  ngOnInit() {
    // console.log('le userId est: ' + localStorage.getItem('userId'));
    this.choixSub = this.choixService.Choix.subscribe(choix => {
      this.choix = choix;
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

}
