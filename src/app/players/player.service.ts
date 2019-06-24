import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  playerName;
  playerData;

  constructor(private route: Router, private fetch: HttpClient){
    if(this.playerName){
      this.fetchData();
    }
  }

  init(player: String){
    if(!this.playerName){
      this.playerName = player;
      this.fetchData();
    } else{
      return;
    }
  }

  fetchData(){
    return this.fetch.get("https://www.googleapis.com/drive/v2/files/1Sgoayrj1r7aLMYx6T4VoNpzmJWI6v1aA?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&alt=media",{"responseType":"text"})
  }

}
