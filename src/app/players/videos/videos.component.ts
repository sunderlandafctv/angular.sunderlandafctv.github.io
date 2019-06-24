import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayerService } from '../player.service'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit {

  constructor(private playerdata: PlayerService, private route: ActivatedRoute) { 
    this.playerdata.init(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" "))
  }

  ngOnInit() {
    console.log(this.playerdata.playerData)
  }

}
