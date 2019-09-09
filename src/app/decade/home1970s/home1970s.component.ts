import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home1970s',
  templateUrl: './home1970s.component.html',
  styleUrls: ['./home1970s.component.scss']
})
export class Home1970sComponent implements OnInit {

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
