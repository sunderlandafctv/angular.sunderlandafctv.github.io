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

  errorText: String = "page"; //specific type of the not found page
  dataText: String; //data related to the not found page

  private allowedSeasons: Array<String> = [ //seasons with data
    "1890s","1900s","1910s","1920s","1930s","1940s",
    "1950-1951","1951-1952","1952-1953","1953-1954","1954-1955","1955-1956","1956-1957","1957-1958","1958-1959","1959-1960",
    "1960-1961","1961-1962","1962-1963","1963-1964","1964-1965","1965-1966","1966-1967","1967-1968","1968-1969","1969-1970",
    "1970-1971","1971-1972","1972-1973","1973-1974","1974-1975","1975-1976","1976-1977","1977-1978","1978-1979","1979-1980",
    "1980-1981","1981-1982","1982-1983","1983-1984","1984-1985","1985-1986","1986-1987","1987-1988","1988-1989","1989-1990",
    "1990-1991","1991-1992","1992-1993","1993-1994","1994-1995","1995-1996","1996-1997","1997-1998","1998-1999","1999-2000"]
  similarSeasons: Array<String> = []; //seasons similar to one provided in data

  private allowedDecades: Array<String> = ["Pre1950s","1950s","1960s","1970s","1980s","1990s"] //decades with data
  similarDecades: Array<String> = []; //decades similar to one provided in data

  ngOnInit(){
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((params: Array<any>) => {
      //store url params
      var pmtext = params["src"];
      this.dataText = params["d"];

      /*
        parseing "src" param
      */
      
      //PLAYER
      if(pmtext == "noplayer") this.errorText = "player";
      else if(pmtext == "noseason"){
        this.errorText = "season";
        //season provided in data"s similarity to allowed seasons
        this.allowedSeasons.forEach(e => {
          var similarity = this.similarity(e,params["d"]);
          if(similarity >= 0.8){
            this.similarSeasons.push(e);
          }
        })
      }
      //DECADE
      else if(pmtext == "nodecade"){
        this.errorText = "decade";
        //decade provided in data"s similarity to allowed decades
        this.allowedDecades.forEach(e => {
          var similarity = this.similarity(e,params["d"]);
          if(similarity >= 0.8){
            this.similarDecades.push(e);
          }
        })
      }
      //if "src" param is not of a valid type
      else {
        this.router.navigate([], {
          queryParams: {src: null, d: null},
          queryParamsHandling: "merge"
        })
      }
    });
  }

  //calculate similarity between 2 strings
  private similarity(s1, s2) {
    var longer = s1,
        shorter = s2;

    //specific here-only function
    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
      var costs = new Array();
      for(var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for(var j = 0; j <= s2.length; j++) {
          if(i == 0) costs[j] = j;
          else{
            if(j > 0) {
              var newValue = costs[j - 1];
              if(s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if(i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
    
    if(s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }

    var longerLength = longer.length;
    if(longerLength == 0) {
      return 1.0
    } else{
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    }
  }

}
