import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  playerData: Array<any>;
  private Observer: Observer<Array<any>>;

  constructor(private papa: Papa, private fetch: HttpClient){}

  getPlayerData(){
    if(this.playerData){
      return new Observable(observer => observer.next(this.playerData) );
    } else{
      return new Observable(observer => {
        this.Observer = observer;
        this.fetchData();
      });
    }
  }

  fetchData(){
    this.fetch.get("https://www.googleapis.com/drive/v2/files/1Sgoayrj1r7aLMYx6T4VoNpzmJWI6v1aA?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&alt=media",{"responseType":"text"}).subscribe(d => {
      this.papa.parse(d,{
        header: true,
        complete: result => {
          this.playerData = result.data;
          this.Observer.next(result.data);
        }
      });
    })
  }

}
