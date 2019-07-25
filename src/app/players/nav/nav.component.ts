import { Component, OnInit, OnDestroy } from "@angular/core";
import { VideoService } from "../video.service";
import { PlayerService } from "../player.service"
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})

export class NavComponent implements OnInit, OnDestroy {

  constructor(private videodata: VideoService, private titleService: Title, private route: ActivatedRoute, private playerdata: PlayerService){}

  hamburgerActive: Boolean = false;

  ngOnInit(){
    this.titleService.setTitle(`${this.route.snapshot.params.player.split(/(?=[A-Z])/).join(" ")} | SUNDERLANDAFC.TV`); //change page title to that of the player
    //TODO related to services
    this.videodata.resetPlayerVideos();  // BODGES MUST BE
    this.playerdata.resetPlayerData();   //   ELIMINATED
    document.querySelector("body").classList.remove("noScroll")
  }

  //unsubscribe from all observables - good practice to emulate in other places
  ngOnDestroy(){
    this.videodata.resetPlayerVideos();
    this.playerdata.resetPlayerData()
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
