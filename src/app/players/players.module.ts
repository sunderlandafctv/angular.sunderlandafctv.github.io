import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../_shared/_shared.module';

import { PlayersRoutingModule } from './players-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { VideosComponent } from './videos/videos.component';

@NgModule({
  declarations: [HomeComponent, NavComponent, VideosComponent],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    SharedModule
  ]
})
export class PlayersModule { }
