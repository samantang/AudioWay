import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DimmoConseilComponent } from './dimmo-conseil.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: DimmoConseilComponent,
    children: [
      {
        path: 'dimmo',
        children: [
          {
            path: '',
            loadChildren: './dimmo/dimmo.module#DimmoPageModule'
          },
          // {
          //   path: ':placeId',
          //   loadChildren:
          //     './discover/place-detail/place-detail.module#PlaceDetailPageModule'
          // }
        ]
      },
      {
        path: 'inscrits',
        children: [
          {
            path: '',
            loadChildren: './inscrits/inscrits.module#InscritsPageModule'
          },
          // {
          //   path: ':placeId',
          //   loadChildren:
          //     './discover/place-detail/place-detail.module#PlaceDetailPageModule'
          // }
        ]
      },
      {
        path: 'audio',
        children: [
          {
            path: '',
            loadChildren: './audio/audio.module#AudioPageModule'
          },
          {
            path: 'new',
            loadChildren:
              './audio/new-choix/new-choix.module#NewChoixPageModule'
          },
          {
            path: 'new-opportunite',
            loadChildren:
              './audio/new-opportunite/new-opportunite.module#NewOpportunitePageModule'
          },
          {
            path: 'mes-choix',
            loadChildren:
              './audio/mes-choix/mes-choix.module#MesChoixPageModule'
          },
          {
            path: 'ensavoir-plus',
            loadChildren:
              './audio/ensavoir-plus/ensavoir-plus.module#EnSavoirPlusPageModule'
          },
          {
            path: 'comment-ca-marche',
            loadChildren:
              './audio/comment-ca-marche/comment-ca-marche.module#CommentCaMarchePageModule'
          },
          {
            path: 'nos-garanties',
            loadChildren:
              './audio/nos-garanties/nos-garanties.module#NosGarantiesPageModule'
          },
          {
            path: 'messages',
            loadChildren:
              './audio/messages/messages.module#MessagesPageModule'
          },
          {
            path: 'tous-les-choix',
            loadChildren:
              './audio/tous-les-choix/tous-les-choix.module#TousLesChoixPageModule'
          },
          {
            path: 'edit/:choixId',
            loadChildren:
              './audio/edit-choix/edit-choix.module#EditChoixPageModule'
          },
          {
            path: 'new/:regionChoisie',
            loadChildren:
              './audio/new-choix/new-choix.module#NewChoixPageModule'
          },
          {
            path: 'details/:choixId',
            loadChildren:
              './audio/details-choix/details-choix.module#DetailsChoixPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/dimmo-conseil/tabs/dimmo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dimmo-conseil/tabs/dimmo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DimmoRoutingModule {}
