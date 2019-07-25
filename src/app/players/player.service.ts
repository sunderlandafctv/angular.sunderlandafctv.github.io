import { Injectable } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "../_shared/_baseClass/baseClass";

@Injectable({
  providedIn: "root"
})

export class PlayerService extends BaseComponent {

  constructor(private papa: Papa, private fetch: HttpClient){
    super();
  }

  playerData: Array<any>;   //could be private? || TODO <-- that
  randomVideos: Array<any>; //this one also
  private observer: Observer<Array<any>>;

  //hella bodge || TODO replace this with an ngOnDestroy call
  resetPlayerData(){
    this.playerData = undefined;
    this.randomVideos = undefined;
    return true;
  }

  /*
    get then use papaparse to parse the data from google drive players csv
  */
  getPlayerData(playerName: String){
    if(this.playerData){
      return new Observable(observer => observer.next(this.playerData.filter(a => a.Name === playerName)[0]));
    } else{
      return new Observable(observer => {
        this.observer = observer;
        this.fetchData(playerName);
      });
    }
  }
  private fetchData(playerName: String){
    this.fetch.get("https://www.googleapis.com/drive/v3/files/15oeaaa7_u3_U-VZZ7kKeWGBpujTNxghE?alt=media&key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek",{"responseType":"text"}).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {
          this.playerData = result.data;
          this.observer.next(result.data.filter(a => a.Name === playerName)[0]);
        }
      });
    })
  }

  /*
    find 2 random videos from a youtube playlist api returned array
  */
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
  private randomNumbers(arr){
    var maxNum = arr.length,
        rtnOne = 0, rtnTwo = 0;

    //check for compilations and top 10 videos
    arr.forEach(video => {
      if(video.snippet.title.toLowerCase().includes("compilation")){
        rtnOne = video;
      } else if(video.snippet.title.toLowerCase().includes("top ten")){
        rtnTwo = video;
      }
    });

    //if no top 10 or compilation return 1 or 2 random videos
    if(rtnOne == 0 && rtnTwo == 0){
      while(rtnOne == rtnTwo){
        rtnOne = arr[Math.floor(Math.random() * maxNum)];
      }
      while(rtnTwo == rtnOne || rtnTwo == 0){ // 0 as it is the initial value of both rtnTwo & rtnOne
        rtnTwo = arr[Math.floor(Math.random() * maxNum)];
      }
    } else if(rtnOne == 0 && rtnTwo != 0){
      rtnOne = arr[Math.floor(Math.random() * maxNum)];
    } else if(rtnOne != 0 && rtnTwo == 0){
      rtnTwo = arr[Math.floor(Math.random() * maxNum)];
    }

    //return results
    return [ rtnOne, rtnTwo ]
  }

}