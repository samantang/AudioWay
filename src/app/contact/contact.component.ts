import { Component, OnInit } from '@angular/core';
import { Choix } from '../dimmo-conseil/audio/new-choix/choix.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  choix: Choix [];
  isLoading = true;

  constructor() { }

  ngOnInit() {}

}
