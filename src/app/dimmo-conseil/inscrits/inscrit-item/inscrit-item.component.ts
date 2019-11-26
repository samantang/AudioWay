import { Component, OnInit, Input } from '@angular/core';
import { Choix } from '../../audio/new-choix/choix.model';
import { ModalController } from '@ionic/angular';
import { InscritDetailsModalComponent } from '../inscrit-details-modal/inscrit-details-modal.component';

@Component({
  selector: 'app-inscrit-item',
  templateUrl: './inscrit-item.component.html',
  styleUrls: ['./inscrit-item.component.scss'],
})
export class InscritItemComponent implements OnInit {
  @Input() users: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async onOpenModalDetailsChoix(){
    const modal = await this.modalController.create({
      component: InscritDetailsModalComponent,
      componentProps: {
        choix1: this.users
      }
    });
    return await modal.present();
  }

}
