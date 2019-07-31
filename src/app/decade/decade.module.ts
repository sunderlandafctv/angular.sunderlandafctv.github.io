import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../_shared/_shared.module";
import { DecadeRoutingModule } from "./decade-routing.module";

//pages
import { NavComponent } from "./nav/nav.component";
import { HomePre1950sComponent } from './home-pre1950s/home-pre1950s.component';
import { Home1950sComponent } from './home1950s/home1950s.component';
import { Home1960sComponent } from './home1960s/home1960s.component';
import { Home1970sComponent } from './home1970s/home1970s.component';
import { Home1980sComponent } from './home1980s/home1980s.component';
import { Home1990sComponent } from './home1990s/home1990s.component';

@NgModule({
  declarations: [NavComponent, Home1950sComponent, Home1960sComponent, Home1970sComponent, Home1980sComponent, Home1990sComponent, HomePre1950sComponent],
  imports: [
    SharedModule,
    CommonModule,
    DecadeRoutingModule
  ]
})

export class DecadeModule { }
