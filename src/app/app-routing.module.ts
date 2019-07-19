import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//search stuff
import { SearchPageComponent } from './search/searchpage/searchpage.component'
import { SearchNavComponent } from './search/searchnav/searchnav.component'

//404 stuff
import { PageNotFoundNavComponent } from './404/page-not-found-nav/page-not-found-nav.component';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component'

const routes: Routes = [
  //home pages
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  //specific player page
  {
    path: 'players/:player',
    loadChildren: './players/players.module#PlayersModule'
  },
  //decade pages
  {
    path: 'seasons/:decade',
    loadChildren: './decade/decade.module#DecadeModule'
  },
  //season pages (if season is specified)
  {
    path: 'seasons/:decade/:season',
    loadChildren: './season/season.module#SeasonModule'
  },
  // /search page (routed to after using searchnavcomponent)
  { 
    path: 'search',
    children: [
      { path: '', component: SearchNavComponent, outlet: "nav" },
      { path: '', component: SearchPageComponent },
      { path: ':query', component: SearchPageComponent }
    ]
  },
  //404 page - component configuration
  {
    path: '404',
    children: [
      { path: '', component: PageNotFoundNavComponent, outlet: "nav" },
      { path: '', component: PageNotFoundComponent }
    ]
  },
  //404 page - redirecting unknown pages
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
