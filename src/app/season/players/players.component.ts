import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service"
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})

export class PlayersComponent extends BaseComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router){
    super();
  }

  seasonPlayers;

  ngOnInit(){
    this.seasondata.getAllPlayerData().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => { //maybe unnecessary
      //TODO remove nested subscriptions
      this.seasondata.getSeasonPlayers(this.router.url.split("/")[3]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(d => this.seasonPlayers = d ) 
    });
  }

}