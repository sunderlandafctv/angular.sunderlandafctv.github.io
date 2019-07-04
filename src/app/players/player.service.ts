import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private papa: Papa, private fetch: HttpClient){}

  playerData: Array<any>;
  randomVideos: Array<any>;
  private observer: Observer<Array<any>>;

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

  private fetchData(playerName: String){
    this.fetch.get("https://www.googleapis.com/drive/v2/files/1Sgoayrj1r7aLMYx6T4VoNpzmJWI6v1aA?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&alt=media",{"responseType":"text"}).subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {
          this.playerData = result.data;
          this.observer.next(result.data.filter(a => a.Name === playerName)[0]);
        }
      });
    })
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

    return [ rtnOne, rtnTwo ]
  }

}