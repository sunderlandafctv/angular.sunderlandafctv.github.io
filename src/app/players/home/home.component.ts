import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private playerdata: PlayerService){}

  ngOnInit() {
    this.playerdata.getPlayerData().subscribe(d => {
      console.log(d)
    });
  }

  click(){
    console.log(this.playerdata.playerData)
  }

}
