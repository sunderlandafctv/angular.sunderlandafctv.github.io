import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../_shared/_shared.module";

import { DecadeRoutingModule } from "./decade-routing.module";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [NavComponent, HomeComponent],
  imports: [
    SharedModule,
    CommonModule,
    DecadeRoutingModule
  ]
})

export class DecadeModule { }
