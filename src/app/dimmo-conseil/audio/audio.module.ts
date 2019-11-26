import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AudioComponent } from './audio.component';
import { ChoixItemComponent} from './choix-item/choix-item.component';
import { MatStepperModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: AudioComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MatStepperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AudioComponent, ChoixItemComponent]
})
export class AudioPageModule {}
