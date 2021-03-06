import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-ca-marche',
  templateUrl: './comment-ca-marche.component.html',
  styleUrls: ['./comment-ca-marche.component.scss'],
})
export class CommentCaMarcheComponent implements OnInit {
  @ViewChild('slides', {static: false}) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private router: Router,
    private navCtrl: NavController) { }

  ngOnInit() {}

  onRetourAccueil(){
    this.router.navigateByUrl('dimmo-conseil/tabs/dimmo');
  }

}
