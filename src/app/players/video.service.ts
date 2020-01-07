import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})

export class VideoService {

  constructor(private fetch: HttpClient, private sanitizer: DomSanitizer){}

  playerVideos = undefined; //again could be private || TODO <-- that
  private Observer: Observer<any>;

  //again bodgey || TODO replace with ngOnDestroy call
  resetPlayerVideos(){
    this.playerVideos = undefined;
    return true;
  }

  //find playlist with player name in all safctv yt playlists and return the videos in it
  //maybe the most complicated (overcomplicated) fn in this entire project
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
      this.fetch.get(`https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyDBs9KZOutpxzd-_fNSUAl-nj0rW01XXJI&channelId=UCoh98rO2DkogICZKE-2fJ7g&maxResults=50&part=snippet`)
      .subscribe(d => {
          pageToken = d["nextPageToken"] || undefined, 
          playerPlaylist = d["items"].find(e => { return e.snippet.title == playerName });
          if(playerPlaylist) resolve(playerPlaylist)
          else if(d["nextPageToken"]) secondaryRequest(this.fetch)
          else reject()
      });
      //if player playlist not found in first 50 playlists
      var secondaryRequest = function(fetch) {
        fetch.get(`https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyDBs9KZOutpxzd-_fNSUAl-nj0rW01XXJI&channelId=UCoh98rO2DkogICZKE-2fJ7g&maxResults=50&part=snippet&pageToken=${pageToken}`)
        .subscribe(d => {
          pageToken = d["nextPageToken"] || undefined, 
          playerPlaylist = d["items"].find(e => { return e.snippet.title == playerName });
          if(playerPlaylist) resolve(playerPlaylist)
          else if(d["nextPageToken"]) secondaryRequest(fetch)
          else reject()
        })
      };
    }).then(d => {
      //make playlist videos request for the player
      this.fetch.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDBs9KZOutpxzd-_fNSUAl-nj0rW01XXJI&maxResults=50&part=snippet&playlistId=${d["id"]}`)
      .subscribe(d => {
        Array.from(d["items"])
        for (let i of d["items"]) i["URL"] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${i.snippet.resourceId.videoId}`);
        this.playerVideos = d;
        this.Observer.next(d);
      })
    }).catch(e => {
      //player not found redirect
      this.Observer.next(["player videos not found"]);
    })
  }

}
