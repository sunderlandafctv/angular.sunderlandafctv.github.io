import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { DataService } from "../data.service"
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent extends BaseComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router){
    super();
  }

  //TODO oh god ts types
  season;
  seasonData;
  randomVideos;
  topPlayers;

  ngOnInit(){
    this.season = this.router.url.split("/")[3]; //could be a route.params subscription
    //season csv
    this.seasondata.getAllSeasonData(this.season).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      d => {
        if(d["League Position"].substr(-1) == ".") d["League Position"] = d["League Position"].slice(0, -1);
        this.seasonData = d
      }
    )
    //get the player csv -> could be consolidated with the playerdata service || TODO <-- that
    this.seasondata.getAllPlayerData().pipe(takeUntil(this.ngUnsubscribe)).subscribe(d => this.seasondata.getSeasonPlayers(this.router.url.split("/")[3]).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      if(d["length"] > 2) this.seasondata.getTopSeasonPlayers(d).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(d => this.topPlayers = d )
    }));
    //get the videos of the season.
    this.seasondata.getSeasonVideos(this.season).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      if(d["length"] < 2) this.randomVideos = d;
      else this.seasondata.getRandomVideos(d).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(d => this.randomVideos = d )
    });
  }
  
}