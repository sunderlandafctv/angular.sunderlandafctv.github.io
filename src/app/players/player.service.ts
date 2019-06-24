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
  private Observer: Observer<Array<any>>;

  getPlayerData(playerName: String){
    if(this.playerData){
      return new Observable(observer => observer.next(this.playerData.filter(a => a.Name === playerName)[0]));
    } else{
      return new Observable(observer => {
        this.Observer = observer;
        this.fetchData(playerName);
      });
    }
  }

  private fetchData(playerName: String){
    this.fetch.get("https://www.googleapis.com/drive/v2/files/1Sgoayrj1r7aLMYx6T4VoNpzmJWI6v1aA?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&alt=media",{"responseType":"text"}).subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {
          this.playerData = result.data;
          this.Observer.next(result.data.filter(a => a.Name === playerName)[0]);
        }
      });
    })
  }

}
