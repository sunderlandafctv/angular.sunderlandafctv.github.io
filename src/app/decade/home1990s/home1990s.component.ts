import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home1990s',
  templateUrl: './home1990s.component.html',
  styleUrls: ['./home1990s.component.scss']
})
export class Home1990sComponent implements OnInit {

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
