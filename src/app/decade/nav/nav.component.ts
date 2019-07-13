import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  hamburgerActive: Boolean = false;

  ngOnInit() {
    console.log("yeet")
  }

  //toggle mobile navigation page
  toggleHamburger(){
    this.hamburgerActive = !this.hamburgerActive
    if(this.hamburgerActive) document.querySelector("body").classList.add("noScroll")
    else document.querySelector("body").classList.remove("noScroll")
  }

  //exit mobile navigation page on clicking a link
  exitHamburgerOnLinkClick(){
    this.hamburgerActive = false;
    document.querySelector("body").classList.remove("noScroll");
  }
}
