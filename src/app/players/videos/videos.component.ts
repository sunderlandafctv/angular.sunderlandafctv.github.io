import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit {

  constructor(private playerdata: PlayerService) {}

  ngOnInit() {
    this.playerdata.getPlayerData().subscribe(d => {
      console.log(d)
    });
  }

}
