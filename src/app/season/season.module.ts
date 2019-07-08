import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonRoutingModule } from './season-routing.module';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { PlayersComponent } from './players/players.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [HomeComponent, VideosComponent, PlayersComponent, NavComponent],
  imports: [
    CommonModule,
    SeasonRoutingModule
  ]
})
export class SeasonModule { }
