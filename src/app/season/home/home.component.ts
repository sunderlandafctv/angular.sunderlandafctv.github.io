import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router){}

  ngOnInit(){
    this.seasondata.getSeasonData(this.router.url.split("/")[3]).subscribe(d => {
      console.log(d)
    });
  }

}
