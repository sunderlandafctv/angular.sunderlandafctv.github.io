import { Component, OnInit } from '@angular/core';
import { Top10sService } from '../top10s.service'

@Component({
  selector: 'app-top10s',
  templateUrl: './top10s.component.html',
  styleUrls: ['./top10s.component.scss']
})

export class Top10sComponent implements OnInit {

  constructor(private top10: Top10sService) { }

  top10videos: Array<any>;

  ngOnInit(){
    //get array from the top10 service || TODO maybe consolidate multiple services which only get videos?
    this.top10.getTop10Videos().subscribe(d => this.top10videos = d["items"] )
  }

}
