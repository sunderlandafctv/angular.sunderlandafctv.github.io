import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})

export class SearchPageComponent implements OnInit, OnDestroy {

  constructor(private fetch: HttpClient, private route: ActivatedRoute, private papa:Papa) { }

  searchQuery: String;

  matchedPlayerList: Array<any>;

  ngOnInit(){

    var fuzzySet = require('fuzzy');

    this.searchQuery = this.route.snapshot.params.query;

    this.fetch.get("https://www.googleapis.com/drive/v2/files/1Sgoayrj1r7aLMYx6T4VoNpzmJWI6v1aA?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&alt=media",{"responseType":"text"}).subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {

          var playerNames = [];
          for(let player of result.data){
            playerNames.push(player.Name)
          }
          playerNames.pop();

          var matches = this.search(this.searchQuery, playerNames);
          console.log(matches);
          
          this.matchedPlayerList = matches;

        }
      });
    })

  }

  ngOnDestroy(){}

  search(query: String, list: Array<any>){
    var fuzzySet = require('fuzzy'),
        results = fuzzySet.filter(query, list),
        matches = results.map(el => { return el.string; });

    return matches;
  }

}
