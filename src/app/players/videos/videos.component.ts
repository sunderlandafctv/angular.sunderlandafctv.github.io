import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayerService } from '../player.service'
import { VideoService } from '../video.service'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit, OnDestroy {

  constructor(private playerdata: PlayerService, private videodata: VideoService, private route: ActivatedRoute) {}

  playerVideos;
  private playerData: Object;

  ngOnInit() {
    this.playerdata.getPlayerData(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")).subscribe(d => {
      this.playerData = d;
      this.videodata.getPlayerVideos(this.playerData["Name"]).subscribe(d => this.playerVideos = d["items"] )
    });
  }

  ngOnDestroy(){
    
  }
}