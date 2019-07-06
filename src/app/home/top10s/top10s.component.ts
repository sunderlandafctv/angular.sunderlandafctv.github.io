import { Component, OnInit } from '@angular/core';
import { Top10sService } from '../top10s.service'

@Component({
  selector: 'app-top10s',
  templateUrl: './top10s.component.html',
  styleUrls: ['./top10s.component.scss']
})

export class Top10sComponent implements OnInit {

  constructor(private top10: Top10sService) { }

  top10videos;

  ngOnInit(){
    this.top10.getTop10Videos().subscribe(d => this.top10videos = d["items"] )
  }

}
