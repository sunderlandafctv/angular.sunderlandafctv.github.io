import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { VideosOTMService } from "../videos-otm.service"
import { BaseComponent } from "../../_shared/_baseClass/baseClass";

@Component({
  selector: "safc-home-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent extends BaseComponent implements OnInit{
  
  constructor(private sanitizer: DomSanitizer, private videos: VideosOTMService){
    super()
  }

  goalOTM;
  gameOTM;

  ngOnInit(){
    this.videos.getOTMVideos().subscribe(d => {
      if(d){
        this.goalOTM = d[0];
        this.gameOTM = d[1];
      } else{
        this.goalOTM = {"URL":this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/lEZJLUuwh8E")};
        this.gameOTM = {"URL":this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/51ZCVdCMIxI")};
      }
    })  
  }

}
