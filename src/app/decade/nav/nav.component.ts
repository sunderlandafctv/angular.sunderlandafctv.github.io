import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})

export class NavComponent {

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute){}

  hamburgerActive: Boolean = false;

  ngOnInit(){
    this.titleService.setTitle(`${this.route.snapshot.params.decade} | SUNDERLANDAFC.TV`); //set document title
    var allowedDecades = [
      "Pre1950s","1950s","1960s","1970s","1980s","1990s"
    ], isAllowedDecade = allowedDecades.find(e => { return e == this.router.url.split("/")[2] })
 
    //check if the season and decade is valid
    if(!isAllowedDecade) this.router.navigate(["/404"], { queryParams: { src: "nodecade", d: this.route.snapshot.params.decade } })
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