import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inscrit-details-modal',
  templateUrl: './inscrit-details-modal.component.html',
  styleUrls: ['./inscrit-details-modal.component.scss'],
})
export class InscritDetailsModalComponent implements OnInit {

  @Input() choix1: any;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
