import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dimmo-conseil', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'auth-connexion', loadChildren: './auth-connexion/auth-connexion.module#AuthConnexionPageModule' },
  { path: 'motdepasse-oublie', loadChildren: './auth/motdepass-oublie/motdepasse-oublie.module#MotDePasseOubliePageModule' },
  {
    path: 'dimmo-conseil',
    loadChildren: './dimmo-conseil/dimmo.module#DimmoPageModule',
    // canLoad: [AuthGuard]
  },
  // {
  //   path: 'bookings',
  //   loadChildren: './bookings/bookings.module#BookingsPageModule',
  //   canLoad: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
