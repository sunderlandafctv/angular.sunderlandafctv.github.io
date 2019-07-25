import { Component } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent {

  constructor() { }

  hamburgerActive: Boolean = false;

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
