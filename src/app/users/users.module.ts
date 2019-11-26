import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
// import { AudioComponent } from './audio.component';
// import { ChoixItemComponent} from './choix-item/choix-item.component';
import { MatStepperModule } from '@angular/material';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStepperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersComponent]
})
export class UsersPageModule {}
