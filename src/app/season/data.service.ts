import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../_shared/_baseClass/baseClass';

@Injectable({
  providedIn: 'root'
})

export class DataService extends BaseComponent {

  constructor(private papa: Papa, private fetch: HttpClient, private sanitizer: DomSanitizer){
    super();
  }

  //ALL DATA FROM THE SEASON CSV

  seasonData;
  private seasonObserver;

  getAllSeasonData(season){
    if(this.seasonData) return new Observable(observer => observer.next(this.seasonData));
    else{
      return new Observable(observer => {
        this.seasonObserver = observer;
        this.fetchAllSeasonData(season);
      });
    }
  }
  private fetchAllSeasonData(season){
    this.fetch.get("https://www.googleapis.com/drive/v3/files/13zFcmgj-ZniGi56ryFnOHHLrihkHr0gZ?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&alt=media", {responseType: 'text'}).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
    this.papa.parse(d,{
        header: true,
        complete: result => {
          result.data.pop(); //TODO remove if/when CSV data comes back with 0 errors
          var seasonData = result.data.filter(a => a.Season === season)[0]
          this.seasonData = seasonData;
          if(seasonData) this.seasonObserver.next(seasonData);
          else this.seasonObserver.error(seasonData);
        }
      });
    })
  }

  //ALL DATA FROM THE PLAYER CSV

  playerData;
  randomVideos;
  private playerObserver;

  getAllPlayerData(){
    if(this.playerData){
      return new Observable(observer => observer.next(this.playerData));
    } else{
      return new Observable(observer => {
        this.playerObserver = observer;
        this.fetchPlayerData();
      });
    }
  }
  private fetchPlayerData(){
    this.fetch.get("https://www.googleapis.com/drive/v3/files/15oeaaa7_u3_U-VZZ7kKeWGBpujTNxghE?alt=media&key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek",{"responseType":"text"}).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {
          this.playerData = result.data;
          result.data.pop()
          this.playerObserver.next(result.data);
        }
      });
    })
  }

  //THE PLAYERS THAT PLAYED DURNG THAT SEASON

  seasonPlayersData;
  private seasonPlayersObserver;
  
  getSeasonPlayers(season:string){
    if(this.seasonPlayersData){
      return new Observable(observer => observer.next(this.seasonPlayersData));
    } else{
      return new Observable(observer => {
        this.seasonPlayersObserver = observer;
        this.fetchSeasonPlayers(season);
      });
    }
  }
  private fetchSeasonPlayers(season:string){
    function isBetween(n,a,b)  {
      return (n - a) * (n - b) <= 0
    }
    //for the decades treated as seasons
    if(season.charAt(4) == "s"){
      var result = [], decadeYears = {
        "from": Number(season.replace("s","")),
        "to": Number(season.replace("s","")) + 9
      }
      this.playerData.forEach(player => {
        var playerYears = {
          "from": player["Years "].split("-")[0], "to"  : player["Years "].split("-")[1]
        }
        if(isBetween(decadeYears.from, playerYears.from, playerYears.to) || isBetween(decadeYears.to, playerYears.from, playerYears.to)) result.push(player)
      });

    } 
    //for regular seasons
    else if(season.charAt(4) == "-"){
      var result = [], seasonYears = {
        "from": season.split("-")[0], 
        "to"  : season.split("-")[1]
      }
      this.playerData.forEach(player => {
        var playerYears = {
          "from": player["Years "].split("-")[0], "to"  : player["Years "].split("-")[1]
        }
        if(isBetween(seasonYears.from, playerYears.from, playerYears.to) && isBetween(seasonYears.to, playerYears.from, playerYears.to)) result.push(player)
      });
    }
    Array.from(result) //tbf i have no idea what this fn does except that it stops a couple of errors so there you go
    this.seasonPlayersObserver.next(result)
  }

  //GET TOP PLAYERS FROM THE SEASON

  seasonTopPlayersData;
  private seasonTopPlayersObserver;
  
  getTopSeasonPlayers(data){
    if(this.seasonTopPlayersData){
      return new Observable(observer => observer.next(this.seasonTopPlayersData));
    } else{
      return new Observable(observer => {
        this.seasonTopPlayersObserver = observer;
        this.fetchTopSeasonPlayers(data);
      });
    }
  }
  private fetchTopSeasonPlayers(d){
    var topScorers = [];
    d.sort((a, b) => b.Goals - a.Goals)
    for(var i = 0; i < 3; i++) {
      topScorers.push( d["filter"](data => data.Goals === d[i].Goals)[0] )
    }
    this.seasonTopPlayersObserver.next(topScorers)
  }

  //GET VIDEOS FROM THE SEASON PLAYLIST

  seasonVideosData;
  private seasonVideosObserver;

  getSeasonVideos(season: String){
    if(this.seasonVideosData){
      return new Observable(observer => observer.next(this.seasonVideosData));
    } else{
      return new Observable(observer => {
        this.seasonVideosObserver = observer;
        this.fetchSeasonVideos(season);
      });
    }
  }

  private fetchSeasonVideos(season: String){
    function isBetween(n,a,b)  {
      return (n - a) * (n - b) <= 0
    }
    const seasons = { //yt playlist ids for each "decade"
      "Pre":"PLiVty6-a8hTyIQnquz7JuJUbmptgl4k4X",
      "195":"PLiVty6-a8hTxkwNk7KNVCCiy5Q8r8pnn6",
      "196":"PLiVty6-a8hTxnKHpV0vERrl-TFI2JNI5e",
      "197":"PLiVty6-a8hTzWHK1t0PZQ_nybFZuf4hpv",
      "198":"PLiVty6-a8hTw5XVCGnZ4BoH1NE7swf_LB",
      "199":"PLiVty6-a8hTw-YVfL4cX4-FwVnFL1gP8Q"
    }
    var decadePlaylistID = season.charAt(4) == "s" ? seasons.Pre : seasons[season.substr(0,3)];
    this.fetch.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&maxResults=50&part=snippet&playlistId=${decadePlaylistID}`).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      var results: Array<any> = [];
      if(decadePlaylistID == "PLiVty6-a8hTyIQnquz7JuJUbmptgl4k4X"){
        //specific variable for the pre 1950s "decade" because the pre
        var decadeYears = {
          "from": Number(season.replace("s","")),
          "to": Number(season.replace("s","")) + 10
        }
        d["items"].forEach(video => {
          var videoTitle = video.snippet.title.split("-")[1].split(" ");
          if(isBetween(videoTitle[videoTitle.length - 1], decadeYears.from, decadeYears.to) && isBetween(videoTitle[videoTitle.length - 1], decadeYears.from, decadeYears.to)){
            video["URL"] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${video.snippet.resourceId.videoId}`)
            results.push(video)
          }
        });
      } else{
        d["items"].forEach(video => {
          var videoTitle = video.snippet.title.split("-")[1].split(" ");
          if(videoTitle[videoTitle.length - 1] == season.split("-")[0]){
            video["URL"] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${video.snippet.resourceId.videoId}`)
            results.push(video)
          }
        });
      }
      this.seasonVideosData = results; 
      this.seasonVideosObserver.next(results)
    })

  }

  //RANDOM VIDEOS

  getRandomVideos(arr){
    if(this.randomVideos){
      return new Observable(observer => observer.next(this.randomVideos));
    } else{
      return new Observable(observer => {
        var random = this.randomNumbers(arr);
        this.randomVideos = random;
        observer.next(random)
      });
    }
  }
  //appears elsewhere except now without identifying certain video titles
  private randomNumbers(arr){
    var maxNum = arr.length,
        rtnOne = 0, rtnTwo = 0;

    if(rtnOne == 0 && rtnTwo == 0){
      while(rtnOne == rtnTwo) rtnOne = arr[Math.floor(Math.random() * maxNum)]
      while(rtnTwo == rtnOne || rtnTwo == 0) rtnTwo = arr[Math.floor(Math.random() * maxNum)]
    } 
    else if(rtnOne == 0 && rtnTwo != 0) rtnOne = arr[Math.floor(Math.random() * maxNum)];
    else if(rtnOne != 0 && rtnTwo == 0) rtnTwo = arr[Math.floor(Math.random() * maxNum)];

    return [ rtnOne, rtnTwo ]
  }

}