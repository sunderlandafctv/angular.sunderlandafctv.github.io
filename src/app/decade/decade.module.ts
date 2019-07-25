import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../_shared/_shared.module";

import { DecadeRoutingModule } from "./decade-routing.module";
import { NavComponent } from "./nav/nav.component";

@NgModule({
  declarations: [NavComponent],
  imports: [
    SharedModule,
    CommonModule,
    DecadeRoutingModule
  ]
})

export class DecadeModule { }
