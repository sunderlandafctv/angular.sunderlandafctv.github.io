import { Component, OnInit } from "@angular/core";
import { Top10sService } from "../top10s.service"
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-top10s",
  templateUrl: "./top10s.component.html",
  styleUrls: ["./top10s.component.scss"]
})

export class Top10sComponent extends BaseComponent implements OnInit {

  constructor(private top10: Top10sService) {
    super();
  }

  top10videos: Array<any>;

  ngOnInit(){
    this.top10.getTop10Videos().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => this.top10videos = d["items"] )
  }

}
