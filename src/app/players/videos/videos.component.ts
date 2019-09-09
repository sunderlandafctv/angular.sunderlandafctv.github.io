import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { PlayerService } from "../player.service"
import { VideoService } from "../video.service"
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.scss"]
})

export class VideosComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(private playerdata: PlayerService, private videodata: VideoService, private route: ActivatedRoute) {
    super();
  }

  playerVideos: Object;
  private playerData: Object;

  //TODO surely theres a better way to get player name than "this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")"?"
  ngOnInit() {
    this.playerdata.getPlayerData(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      this.playerData = d;
      this.videodata.getPlayerVideos(this.playerData["Name"]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        d => {
          
          if(d["items"]) this.playerVideos = d["items"]
          else this.playerVideos = 'Player videos not found'
        
        }
      )
    });
  }

}