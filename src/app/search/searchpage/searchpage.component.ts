import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Papa } from "ngx-papaparse";
import { Router } from "@angular/router"
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-searchpage",
  templateUrl: "./searchpage.component.html",
  styleUrls: ["./searchpage.component.scss"]
})

export class SearchPageComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, private fetch: HttpClient, private route: ActivatedRoute, private papa:Papa){
    super();
  }

  noQuery: Boolean = false;
  searchQuery: String;
  playerData: Array<any>;
  matchedPlayerList: Array<any> = []; //search results
  noPlayers: Boolean = false;

  ngOnInit(){

    this.fetch.get("https://www.googleapis.com/drive/v3/files/15oeaaa7_u3_U-VZZ7kKeWGBpujTNxghE?alt=media&key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek",{"responseType":"text"}).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {

          result.data.pop(); // only until the csv is fixed
          this.playerData = result.data;

          this.route.params.subscribe(params => {
            if(!params["query"]){ //show search box if no query is present
              this.noQuery = true;
            } else{ //otherwise continue
              this.searchQuery = params["query"];
              this.search(params["query"]);
            }
          });

        }
      });
    });
  }

  search(query: String){

    console.log(query)
    //search for players using fuzzySet (npm package)    
    var searchResults = [],
      fuzzySet = require("fuzzy");
      fuzzySet.filter(query, this.playerData, {
        extract: function(el){ return el.Name; }})
          .map(el => { return el.string; })
          .forEach(playerName => searchResults.push(this.playerData.filter(a => a.Name == playerName)[0]) 
      );

    //parse results
    this.matchedPlayerList = searchResults;
    this.noPlayers = this.matchedPlayerList.length == 0 ? true : false;
  }

}
