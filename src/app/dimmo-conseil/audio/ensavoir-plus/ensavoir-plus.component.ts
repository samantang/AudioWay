import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ensavoir-plus',
  templateUrl: './ensavoir-plus.component.html',
  styleUrls: ['./ensavoir-plus.component.scss'],
})
export class EnsavoirPlusComponent implements OnInit {
  @ViewChild('slides', {static: false}) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(public router: Router) { }

  ngOnInit() {}

  onChercheOpportunite(){
    this.router.navigate(['/dimmo-conseil/tabs/audio/new']);
  }

}


