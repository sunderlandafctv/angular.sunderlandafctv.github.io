import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PlayerService } from '../player.service';
import { VideoService } from '../video.service';
import { isArray } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private playerdata: PlayerService, private videodata: VideoService, private route: ActivatedRoute, private sanitizer: DomSanitizer){}

  playerData;
  randomVideos: Array<any>;

  ngOnInit() {

    Array.prototype.test = function(){
      console.log("test")
    }

    this.playerdata.getPlayerData(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")).subscribe(d => {
      
      this.playerData = d;
      this.videodata.getPlayerVideos(this.playerData["Name"]).subscribe(d => {
        console.log(
          d, isArray(d)
        )
        d.test;
        // d.forEach(element => {
        //   if(element.snippet.title.contains("Top 10")){
        //     console.log(element)
        //   }
        // });
      });

    });
  }

}
