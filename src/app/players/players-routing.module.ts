import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//page/nav components
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { VideosComponent } from "./videos/videos.component";

const routes: Routes = [
  //nav w/ different outlet
  { 
    path: "", 
    component: NavComponent, 
    outlet: "nav" 
  },
  //actual pages
  { 
    path: "", 
    redirectTo: "home", 
  },
  { 
    path: "home", 
    component: HomeComponent, 
  },
  { 
    path: "videos", 
    component: VideosComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PlayersRoutingModule{}