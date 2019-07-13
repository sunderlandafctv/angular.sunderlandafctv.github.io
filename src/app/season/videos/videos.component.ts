import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router){}

  seasonVideos;
  seasonVideosLength: Number;

  ngOnInit(){
    this.seasondata.getSeasonVideos(this.router.url.split("/")[3]).subscribe((d: Array<any>) => {
      this.seasonVideos = d;
      this.seasonVideosLength = d.length; 
    });
  }

}