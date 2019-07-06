import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PlayerService } from '../player.service';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private playerdata: PlayerService, private videodata: VideoService, private route: ActivatedRoute, private router: Router){}

  playerData;
  randomVideos;

  ngOnInit(){
    this.playerdata.getPlayerData(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")).subscribe(d => {
      console.log(d)
      if(!d){
        this.router.navigate(['/product-list'], { queryParams: { src: "noplayer" } });
      } else{
        this.playerData = d;
        this.videodata.getPlayerVideos(this.playerData["Name"]).subscribe(d => {
          this.playerdata.getRandomVideos(d["items"]).subscribe(videos => this.randomVideos = videos );
        });
      }
    });
  }

}
