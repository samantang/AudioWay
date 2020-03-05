import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MotdepassOublieComponent } from './motdepass-oublie.component';
// import { AuthConnexionComponent } from './auth-connexion.component';

// import { AuthPage } from './auth.page';
// import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: MotdepassOublieComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MotdepassOublieComponent]
})
export class MotDePasseOubliePageModule {}
