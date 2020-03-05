import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatStepperModule } from '@angular/material';
import { TousLesChoixComponent } from './tous-les-choix.component';
import { TousLesChoixItemComponent } from './tous-les-choix-item/tous-les-choix-item.component';


const routes: Routes = [
  {
    path: '',
    component: TousLesChoixComponent
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
  declarations: [TousLesChoixComponent, TousLesChoixItemComponent]
})
export class TousLesChoixPageModule {}
