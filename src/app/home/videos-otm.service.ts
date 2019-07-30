import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "../_shared/_baseClass/baseClass";
import { Observer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VideosOTMService extends BaseComponent{

  constructor(private fetch: HttpClient, private sanitizer: DomSanitizer){
    super()
  }

  private otmVideos: Object;
  private Observer: Observer<Object>;

  getOTMVideos(){
    if(this.otmVideos){
      return new Observable(observer => observer.next(this.otmVideos));
    } else{
      return new Observable(observer => {
        this.Observer = observer;
        this.fetch.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&maxResults=2&part=snippet&playlistId=PLiVty6-a8hTz-dMkL2e3oKp56fjk3lXev`).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(d => {
          console.log(d)
          //because of typescript"s wierd variable type system
          Array.from(d["items"])
          //bypassSecurityTrustResourceUrl() is called to stop XSS and iframe security errors returned by angular
          for(let i of d["items"]) i["URL"] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${i.snippet.resourceId.videoId}`);
          this.otmVideos = d;
          this.Observer.next(this.otmVideos);
        });
      });
    }
  }
}
