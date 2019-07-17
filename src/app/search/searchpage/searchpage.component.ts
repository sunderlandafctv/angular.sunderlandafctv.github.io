import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})

export class SearchPageComponent implements OnInit, OnDestroy {

  constructor(private fetch: HttpClient, private route: ActivatedRoute, private papa:Papa){}

  noQuery: Boolean = false;
  searchQuery: String;
  playerData: Array<any>;
  matchedPlayerList: Array<any> = []; //search results
  noPlayers: Boolean = false;

  fetchSubscription: Subscription;
  routeSubscription: Subscription;

  ngOnInit(){
    this.fetchSubscription = this.fetch.get("https://www.googleapis.com/drive/v3/files/1_sL4j1cwhhK_KyfjQoEX3rgroyaV0KNQOcaWEu5-ICo/export?mimeType=text%2Fcsv&key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek",{"responseType":"text"}).subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {

          result.data.pop(); // only until the csv is fixed
          this.playerData = result.data;

          this.routeSubscription = this.route.params.subscribe(params => {
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

  ngOnDestroy(){
    this.fetchSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  search(query: String){
    //search for players using fuzzySet (npm package)    
    var searchResults = [],
      fuzzySet = require('fuzzy'),
      results = fuzzySet.filter(query, this.playerData, {extract: function(el){ return el.Name; }}).map(el => { return el.string; }).forEach(playerName => searchResults.push(this.playerData.filter(a => a.Name == playerName)[0]) );

    //parse results
    this.matchedPlayerList = searchResults;
    this.noPlayers = this.matchedPlayerList.length==0 ? true : false;
  }

}
