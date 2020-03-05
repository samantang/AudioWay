import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AuthConnexionComponent } from './auth-connexion.component';

// import { AuthPage } from './auth.page';
// import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthConnexionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthConnexionComponent]
})
export class AuthConnexionPageModule {}
