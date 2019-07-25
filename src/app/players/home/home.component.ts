import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { PlayerService } from "../player.service";
import { VideoService } from "../video.service";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent extends BaseComponent implements OnInit {

  constructor(private playerdata: PlayerService, private videodata: VideoService, private route: ActivatedRoute, private router: Router){
    super();
  }

  playerData: {};
  randomVideos: {};

  ngOnInit(){
    //nested subscriptions are dodgy. || TODO convert these to async susbcribe fns
    this.playerdata.getPlayerData(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      //check if player exists in the db
      if(!d){
        this.router.navigate(["/404"], { queryParams: { src: "noplayer" } });
      } else{
        this.playerData = d;
        this.videodata.getPlayerVideos(this.playerData["Name"]).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          d => this.playerdata.getRandomVideos(d["items"]).pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(videos => this.randomVideos = videos),
          e => this.randomVideos = e
        );
      }
    });
  }

}
