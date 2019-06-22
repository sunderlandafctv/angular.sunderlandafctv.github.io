import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'players/:player',
    loadChildren: () => import('./players/players.module').then(mod => mod.PlayersModule)
  },
  {
    path: 'seasons',
    loadChildren: () => import('./season/season.module').then(mod => mod.SeasonModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
