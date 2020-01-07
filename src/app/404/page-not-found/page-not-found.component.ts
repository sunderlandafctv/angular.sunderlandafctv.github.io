import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"]
})

export class PageNotFoundComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute){
    super();
  }

  ngOnInit(){}

}
