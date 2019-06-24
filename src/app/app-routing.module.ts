import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//search stuff
import { SearchPageComponent } from './search/searchpage/searchpage.component'
import { SearchNavComponent } from './search/searchnav/searchnav.component'

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
    path: 'seasons/:season',
    loadChildren: () => import('./season/season.module').then(mod => mod.SeasonModule)
  },
  { 
    path: 'search',
    children: [
      { path: '', component: SearchNavComponent, outlet: "nav" },
      { path: ':query', component: SearchPageComponent }
    ]
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
