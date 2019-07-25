import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { SearchRequest } from "../search"

@Component({
  selector: "safc-search",
  templateUrl: "./searchform.component.html",
  styleUrls: ["./searchform.component.scss"]
})

export class SearchFormComponent {

  constructor(private router: Router){}

  sq: SearchRequest = new SearchRequest("");
  isFocused: Boolean;

  search(){
    this.router.navigateByUrl(`/search/${this.sq.queryString}`);
  }

  focusHandler(isFocusing: boolean){
    this.isFocused = isFocusing ? true : false
  }

}
