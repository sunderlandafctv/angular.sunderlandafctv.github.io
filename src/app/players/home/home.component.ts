import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private playerdata: PlayerService, private route: ActivatedRoute){}

  ngOnInit() {
    this.playerdata.getPlayerData(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")).subscribe(d => {
      console.log(d)
    });
  }

}
