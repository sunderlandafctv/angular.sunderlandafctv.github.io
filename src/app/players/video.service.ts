import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class VideoService {

  constructor(private fetch: HttpClient, private sanitizer: DomSanitizer){}

  playerVideos = undefined;
  noVideos: Boolean = false;
  private Observer: any;

  resetPlayerVideos(){
    this.playerVideos = undefined;
    return true;
  }

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
    new Promise((resolve, reject) => {
      var playerPlaylist, pageToken;
      //request the first 50 playlists from the youtube api
      this.fetch.get(`https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&channelId=UCoh98rO2DkogICZKE-2fJ7g&maxResults=50&part=snippet`).subscribe(d => {
          pageToken = d["nextPageToken"] || undefined, 
          playerPlaylist = d["items"].find(e => { return e.snippet.title == playerName });
          if(playerPlaylist) resolve(playerPlaylist)
          else if(d["nextPageToken"]) secondaryRequest()
          else reject()
      });
      //if player playlist not found in first 50 playlists
      var secondaryRequest = function() {
        this.fetch.get(`https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&channelId=UCoh98rO2DkogICZKE-2fJ7g&maxResults=50&part=snippet&pageToken=${pageToken}`).subscribe(d => {
          pageToken = d["nextPageToken"] || undefined, 
          playerPlaylist = d["items"].find(e => { return e.snippet.title == playerName });
          if(playerPlaylist) resolve(playerPlaylist)
          else if(d["nextPageToken"]) secondaryRequest()
          else reject()
        })
      };
    }).then(d => {
      //make playlist videos request for the player
      this.fetch.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&maxResults=50&part=snippet&playlistId=${d["id"]}`).subscribe(d => {
        Array.from(d["items"])
        for (let i of d["items"]) i["URL"] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${i.snippet.resourceId.videoId}`);
        this.playerVideos = d;
        this.Observer.next(d);
      })
    }).catch(e => {
      //player not found redirect
      this.Observer.next();
    })
  }

}
