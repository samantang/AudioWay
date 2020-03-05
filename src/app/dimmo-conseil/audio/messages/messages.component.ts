import { Component, OnInit } from '@angular/core';
import { ChoixService } from '../new-choix/choix.service';
import { Router } from '@angular/router';
import { Message } from '../new-choix/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Message []
  messageSub: Subscription;

  constructor(private choixServices: ChoixService, private router: Router) { }

  ngOnInit() {
    this.messageSub = this.choixServices.fetchMessages().subscribe(message =>{
      this.messages = message;
     
    })
  }

}
