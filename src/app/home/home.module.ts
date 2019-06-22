import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { PlayersComponent } from './players/players.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { Top10sComponent } from './top10s/top10s.component';
//search
import { SearchFormComponent } from '../search/searchform/searchform.component';

@NgModule({
  declarations: [SearchFormComponent, HomeComponent, AboutComponent, NavComponent, PlayersComponent, SeasonsComponent, Top10sComponent],
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule
  ]
})

export class HomeModule { }
