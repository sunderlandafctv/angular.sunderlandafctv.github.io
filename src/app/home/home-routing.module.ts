import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//page modules
import { NavComponent }     from "./nav/nav.component";
import { HomeComponent }    from "./home/home.component";
import { SeasonsComponent } from "./seasons/seasons.component";
// import { PlayersComponent } from "./players/players.component";
import { Top10sComponent }  from "./top10s/top10s.component";
import { AboutComponent }   from "./about/about.component";

const routes: Routes = [
  //redirect sunderlandafc.tv to sunderlandafc.tv/home
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
    path: "seasons", 
    component: SeasonsComponent 
  },
  // { 
  //   path: "players", 
  //   component: PlayersComponent 
  // },
  { 
    path: "top10s", 
    component: Top10sComponent 
  },
  { 
    path: "about", 
    component: AboutComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
