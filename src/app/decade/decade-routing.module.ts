import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavComponent } from "./nav/nav.component";
import { HomePre1950sComponent } from './home-pre1950s/home-pre1950s.component';
import { Home1950sComponent } from './home1950s/home1950s.component';
import { Home1960sComponent } from './home1960s/home1960s.component';
import { Home1970sComponent } from './home1970s/home1970s.component';
import { Home1980sComponent } from './home1980s/home1980s.component';
import { Home1990sComponent } from './home1990s/home1990s.component';

const routes: Routes = [
  //nav bar
  { 
    path: "", 
    component: NavComponent, 
    outlet: "nav" 
  },
  //decade pages (all hard coded)
  { 
    path: "Pre1950s", 
    component: HomePre1950sComponent,
  },
  { 
    path: "1950s", 
    component: Home1950sComponent,
  },
  { 
    path: "1960s", 
    component: Home1960sComponent,
  },
  { 
    path: "1970s", 
    component: Home1970sComponent,
  },
  { 
    path: "1980s", 
    component: Home1980sComponent,
  },
  { 
    path: "1990s", 
    component: Home1990sComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DecadeRoutingModule { }
