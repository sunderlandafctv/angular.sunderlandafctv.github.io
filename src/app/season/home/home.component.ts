import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router){}

  season;
  seasonData;
  randomVideos;
  topPlayers;

  ngOnInit(){
    this.season = this.router.url.split("/")[3];
    
    this.seasondata.getAllSeasonData(this.season).subscribe(d => {
        this.seasonData = d
      },
      //TODO remove after all seasons are in the CSV
      error => {
        console.error('Error', error);
        this.seasonData = {
          "Description":"",
          "FA Cup":"",
          "Highest Attendance":"",
          "ID":"",
          "League":"",
          "League Position":"",
          "Season":"",
          "Top scorer":""
        }
      }
    )

    this.seasondata.getAllPlayerData().subscribe(d => this.seasondata.getSeasonPlayers(this.router.url.split("/")[3]).subscribe(d => {
      if(d["length"] > 2) this.seasondata.getTopSeasonPlayers(d).subscribe(d => this.topPlayers = d )
    }));

    this.seasondata.getSeasonVideos(this.router.url.split("/")[3]).subscribe(d => {
      if(d["length"] < 2) this.randomVideos = d;
      else this.seasondata.getRandomVideos(d).subscribe(d => this.randomVideos = d )
    });
  }
  
}