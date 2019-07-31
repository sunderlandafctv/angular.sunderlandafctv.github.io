import { Component } from '@angular/core';

@Component({
  selector: 'app-home1950s',
  templateUrl: './home1950s.component.html',
  styleUrls: ['./home1950s.component.scss']
})
export class Home1950sComponent {

  constructor() { }

  toggleSeasonLinks(e){
    var element = e.target;
    if(element.tagName == "DIV") element.parentNode.classList.toggle("active")
    else if(element.tagName == "P") element.parentNode.parentNode.classList.toggle("active")
    else if(element.tagName == "I") element.parentNode.parentNode.parentNode.classList.toggle("active")
  }

}
