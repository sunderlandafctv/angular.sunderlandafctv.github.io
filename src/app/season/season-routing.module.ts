import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavComponent } from "./nav/nav.component"
import { HomeComponent } from "./home/home.component"
import { VideosComponent } from "./videos/videos.component"
import { PlayersComponent } from "./players/players.component"

const routes: Routes = [
  { 
    path: "", 
    redirectTo: "home", 
    pathMatch: "prefix" 
  },
  //nav bar
  { 
    path: "", 
    component: NavComponent, 
    outlet: "nav" 
  },
  //actual pages
  { 
    path: "home", 
    component: HomeComponent 
  },
  { 
    path: "videos", 
    component: VideosComponent 
  },
  { 
    path: "players", 
    component: PlayersComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasonRoutingModule { }
