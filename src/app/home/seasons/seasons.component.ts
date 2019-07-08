import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleLinks(e){
    var element = e.target;
    element.tagName == "BUTTON" ? element.parentNode.parentNode.classList.toggle("active") : element.parentNode.parentNode.parentNode.classList.toggle("active")
  }

}
