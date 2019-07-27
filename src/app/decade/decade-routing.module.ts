import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  //nav bar
  { 
    path: "", 
    component: NavComponent, 
    outlet: "nav" 
  },
  { 
    path: "", 
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DecadeRoutingModule { }
