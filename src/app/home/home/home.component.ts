import { Component, OnInit } from "@angular/core";
import { VideosOTMService } from "../videos-otm.service";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "../../_shared/_baseClass/baseClass";

@Component({
  selector: "safc-home-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent extends BaseComponent implements OnInit{
  
  constructor(private videos: VideosOTMService){
    super()
  }

  public goalOTM: String;
  public gameOTM: String;

  ngOnInit(){
    this.videos.getOTMVideos().pipe(takeUntil(this.ngUnsubscribe)).subscribe(d => {
      this.goalOTM = d["items"][0];
      this.gameOTM = d["items"][1];
    })  
  }

}
