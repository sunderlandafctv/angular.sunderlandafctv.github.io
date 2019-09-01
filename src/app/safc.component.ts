import { Component, OnInit } from "@angular/core";
import { NavigationStart, NavigationEnd, NavigationCancel, Router } from '@angular/router';
import { BaseComponent } from './_shared/_baseClass/baseClass';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "safc-app",
  templateUrl: "./safc.component.html",
  styleUrls: ["./safc.component.scss"]
})

export class AppComponent extends BaseComponent implements OnInit {
  
  constructor(private router: Router){
    super();
  }
  
  isOffline = false;
  isLoading = true;

  ngOnInit(){
    this.isOffline = !navigator.onLine;
    if(!navigator.onLine){ document.querySelector("body").classList.add("noScroll") }
  }

  hideModal(){
    this.isOffline = false;
    document.querySelector("body").classList.remove("noScroll");
  }

  ngAfterViewInit() {
    var subscription = this.router.events.subscribe(e => {
      if(e instanceof NavigationStart){
        this.isLoading = true;
      } else if(e instanceof NavigationEnd){
        this.isLoading = false;
        subscription.unsubscribe()
      }
    });
  }

}
