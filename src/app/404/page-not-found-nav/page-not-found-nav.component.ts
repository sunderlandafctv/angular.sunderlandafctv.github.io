import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-page-not-found-nav",
  templateUrl: "./page-not-found-nav.component.html",
  styleUrls: ["./page-not-found-nav.component.scss"]
})

export class PageNotFoundNavComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute){
    super();
  }

  hamburgerActive: Boolean = false;
  routerSubscription: Subscription;

  private capitaliseFirst(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit(){
    //set page title
    this.titleService.setTitle(`${this.capitaliseFirst(this.route.snapshot["_routerState"].url.replace("/",""))} | SUNDERLANDAFC.TV`)
    document.querySelector("body").classList.remove("noScroll");
    //look for url changes
    this.routerSubscription = this.router.events.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        //set page title
        this.titleService.setTitle(`${this.capitaliseFirst(this.route.snapshot["_routerState"].url.replace("/",""))} | SUNDERLANDAFC.TV`)
      }
    });
  }

  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
  }

  //toggle mobile navigation page
  toggleHamburger(){
    this.hamburgerActive = !this.hamburgerActive;
    if(this.hamburgerActive){
      document.querySelector("body").classList.add("noScroll");
    } else{
      document.querySelector("body").classList.remove("noScroll");
    }
  }

  //exit mobile navigation page on clicking a link
  exitHamburgerOnLinkClick(){
    this.hamburgerActive = false;
    document.querySelector("body").classList.remove("noScroll");
  }

}
