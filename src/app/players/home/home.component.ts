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
    this.playerdata.getPlayerData(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")).subscribe(d => {
      this.playerData = d;
      this.videodata.getPlayerVideos(this.playerData["Name"]).subscribe(d => {

        var videos = {
          Compilation: d["find"](e => {
            if(e.snippet.title == `${this.playerData.Name} Compilation`) return e;
          }),
          Top10: d["find"](e => {
            if(e.snippet.title.includes("Top")) return e;
          }),
          Random: [
            d["find"](e => {
              if(e.snippet.title !== videos.Compilation && e.snippet.title !== videos.Top10) return e;
            }),
            d["find"](e => {
              if(e.snippet.title !== videos.Random[0] && e.snippet.title !== videos.Compilation && e.snippet.title !== videos.Top10) return e;
            })
          ]
        }

        console.log(
          videos
        )        
        
        // playerComp(d).then(e => {
        //   var f = e["Random"], random = [
        //       f, d["find"](e => {if(e.snippet.title!=f.snippet.title&&e.snippet.title!=`${this.playerData.Name} Top 10 Goals`&&e.snippet.title!=`${this.playerData.Name} compilation`){return e;}})
        //   ]
        //   e["Compilation"] ? console.log(e["Compilation"].snippet.resourceId.videoId) : console.log(random[0].snippet.resourceId.videoId);
        //   e["Top 10"] ? console.log(e["Top 10"].snippet.resourceId.videoId) : console.log(random[1].snippet.resourceId.videoId);
        // });

      });
    });
  }

}
