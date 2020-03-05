import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DimmoRoutingModule } from './dimmo-routing.module';
import { DimmoConseilComponent } from './dimmo-conseil.component';
import { MatStepperModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { InscritDetailsModalComponent } from './inscrits/inscrit-details-modal/inscrit-details-modal.component';
import { AuthService } from '../auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    DimmoRoutingModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  declarations: [DimmoConseilComponent],
  exports: [
  ]
})
export class DimmoPageModule {}
