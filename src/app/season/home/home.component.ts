import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

import { DataService } from "../data.service"
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/_shared/_baseClass/baseClass";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent extends BaseComponent implements OnInit {

  constructor(private seasondata: DataService, private router: Router, private activeroute: ActivatedRoute){
    super();
  }

  season: string;
  nextSeason: string;
  previousSeason: string;
  seasonData;
  randomVideos;
  topPlayers;

  ngOnInit(){

    this.season = this.activeroute.snapshot.params.season; //could be a route.params subscription
    //season csv
    this.seasondata.getAllSeasonData(this.season).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      d => {
        if(d["League Position"].substr(-1) == ".") d["League Position"] = d["League Position"].slice(0, -1);
        this.seasonData = d;

        var allowedSeasons = [ //could be imported from a file but this is more efficient
          "1890s","1900s","1910s","1920s","1930s","1940s",
          "1950-1951","1951-1952","1952-1953","1953-1954","1954-1955","1955-1956","1956-1957","1957-1958","1958-1959","1959-1960",
          "1960-1961","1961-1962","1962-1963","1963-1964","1964-1965","1965-1966","1966-1967","1967-1968","1968-1969","1969-1970",
          "1970-1971","1971-1972","1972-1973","1973-1974","1974-1975","1975-1976","1976-1977","1977-1978","1978-1979","1979-1980",
          "1980-1981","1981-1982","1982-1983","1983-1984","1984-1985","1985-1986","1986-1987","1987-1988","1988-1989","1989-1990",
          "1990-1991","1991-1992","1992-1993","1993-1994","1994-1995","1995-1996","1996-1997","1997-1998","1998-1999","1999-2000"
        ],

        allowedDecades = [
          "Pre1950s","1950s","1960s","1970s","1980s","1990s"
        ]

        var nextSeason = allowedSeasons[(allowedSeasons.indexOf(this.season) + 1)] || null;
        var previousSeason = allowedSeasons[(allowedSeasons.indexOf(this.season) - 1)] || null;

        var nextDecade;
        var previousDecade;

        allowedDecades.forEach(decade => {
          var seasonPartOfDecade = 
            (nextSeason || "").substring(0,3) == (decade || "").replace(/\D/g,'').substring(0,3) ||
            ((nextSeason || "").substring(0,1) == (decade || "").substring(3,4)) && ((nextSeason || "").substring(3,5) == (decade || "").substring(6,8))
  
          if(seasonPartOfDecade) nextDecade = decade
        })

        allowedDecades.forEach(decade => {
          var seasonPartOfDecade = 
            (previousSeason || "").substring(0,3) == (decade || "").replace(/\D/g,'').substring(0,3) ||
            ((previousSeason || "").substring(0,1) == (decade || "").substring(3,4)) && ((previousSeason || "").substring(3,5) == (decade || "").substring(6,8))
  
          if(seasonPartOfDecade) previousDecade = decade
        })

        this.nextSeason = `/seasons/${nextDecade}/${nextSeason}`;
        this.previousSeason = `/seasons/${previousDecade}/${previousSeason}`;
    
      }
    )
    //get the player csv -> could be consolidated with the playerdata service || TODO <-- that
    this.seasondata.getAllPlayerData().pipe(takeUntil(this.ngUnsubscribe)).subscribe(d => this.seasondata.getSeasonPlayers(this.activeroute.snapshot.params.season).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(d => {
        if(d["length"] > 2) this.seasondata.getTopSeasonPlayers(d).pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(d => this.topPlayers = d )
      }));

    //get the videos of the season.
    this.seasondata.getSeasonVideos(this.season).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(d => {
        if(d["length"] < 2) this.randomVideos = d;
        else this.seasondata.getRandomVideos(d).pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(d => this.randomVideos = d )
      });
  }
  
}