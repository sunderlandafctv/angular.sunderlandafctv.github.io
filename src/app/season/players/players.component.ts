import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router){}

  seasonPlayers;

  ngOnInit(){
    this.seasondata.getAllPlayerData().subscribe(d => this.seasondata.getSeasonPlayers(this.router.url.split("/")[3]).subscribe(d => this.seasonPlayers = d ) );
  }

}