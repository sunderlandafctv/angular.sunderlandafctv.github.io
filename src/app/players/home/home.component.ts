import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { PlayerService } from '../player.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private playerdata: PlayerService, private route: ActivatedRoute, private papa: Papa) { 
    this.playerdata.init(this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" "));
  }

  ngOnInit() {
    this.playerdata.fetchData().subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {

          result.data.pop(); // only until the csv is fixed

          this.playerdata.playerData = result.data.find( a => { return a.Name == this.playerdata.playerName })

        }
      });
    });
  }

  click(){
    console.log(this.playerdata.playerData)
  }

}
