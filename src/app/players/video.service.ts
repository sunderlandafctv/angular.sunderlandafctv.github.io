import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class VideoService {

  constructor(private fetch: HttpClient, private sanitizer: DomSanitizer){}

  playerVideos: Array<any>;
  noVideos: Boolean = false;
  private Observer: any;

  getPlayerVideos(playerName: String){
    if(this.playerVideos){
      return new Observable(observer => observer.next(this.playerVideos));
    } else{
      return new Observable(observer => {
        this.Observer = observer;
        this.fetchPlaylist(playerName);
      });
    }
  }

  private fetchPlaylist(playerName: String){
    this.fetch.get(`https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&channelId=UCoh98rO2DkogICZKE-2fJ7g&maxResults=50&part=snippet`).subscribe(d => {
      var playerPlaylist = d["items"].find(e => { return e.snippet.title == playerName });
      if(playerPlaylist){
        this.fetch.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&playlistId=${playerPlaylist.id}&maxResults=50&part=snippet`).subscribe(d => {
        Array.from(d["items"])
        for (let i of d["items"]) i["URL"] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${i.snippet.resourceId.videoId}`);
          this.playerVideos = d["items"];
          this.Observer.next(d["items"]);
        })
      }
    })

  }

}
