import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-pre1950s',
  templateUrl: './home-pre1950s.component.html',
  styleUrls: ['./home-pre1950s.component.scss']
})
export class HomePre1950sComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleSeasonLinks(e){
    var element = e.target;
    if(element.tagName == "DIV") element.parentNode.classList.toggle("active")
    else if(element.tagName == "P") element.parentNode.parentNode.classList.toggle("active")
    else if(element.tagName == "I") element.parentNode.parentNode.parentNode.classList.toggle("active")
  }

}
