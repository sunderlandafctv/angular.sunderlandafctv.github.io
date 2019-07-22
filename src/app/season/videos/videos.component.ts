import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/_shared/_baseClass/baseClass';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent extends BaseComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router){
    super();
  }

  seasonVideos;
  seasonVideosLength: Number;

  ngOnInit(){
    this.seasondata.getSeasonVideos(this.router.url.split("/")[3]).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((d: Array<any>) => {
      this.seasonVideos = d;
      this.seasonVideosLength = d.length; 
    });
  }

}