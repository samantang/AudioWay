import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatStepperModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DetailsChoixComponent } from './details-choix.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsChoixComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  declarations: [DetailsChoixComponent]
})
export class DetailsChoixPageModule {}
