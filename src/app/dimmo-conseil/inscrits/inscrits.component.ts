import { Component, OnInit } from '@angular/core';
import { Choix } from '../audio/new-choix/choix.model';

@Component({
  selector: 'app-inscrits',
  templateUrl: './inscrits.component.html',
  styleUrls: ['./inscrits.component.scss'],
})
export class InscritsComponent implements OnInit {

  choix: Choix [];
  users = [
    {
      firstName: 'BAH',
      lastName: 'saliou',
      email: 'saliou@bah.com',
      phone: '3565435600',
      choix: [
        {titrePost: 'audioProtesiste',
        region: 'Grand Est',
        disponibilite: 'fin Janvier'},
        {titrePost: 'assistant Audio',
        region: 'Occitanie',
        disponibilite: 'debut Janvier'}
      ]
    },
    {
      firstName: 'DIALLO',
      lastName: 'François',
      email: 'francois@diallo.com',
      phone: '0000000000',
      choix: [
        {titrePost: 'AudioVolant',
        region: 'Ile de France',
        disponibilite: '01/05/2020'},
        {titrePost: 'assistantAudioCCD',
        region: 'Occitanie',
        disponibilite: 'debut Janvier'}
      ]
    }
  ]
  isLoading = true;
  constructor() { }

  ngOnInit() {}

}
