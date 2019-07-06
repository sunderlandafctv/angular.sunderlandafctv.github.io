import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class Top10sService {

  constructor(private fetch: HttpClient, private sanitizer: DomSanitizer) { }

  top10Videos = undefined;
  private Observer: any;

  getTop10Videos(){
    if(this.top10Videos){
      return new Observable(observer => observer.next(this.top10Videos));
    } else{
      return new Observable(observer => {
        this.Observer = observer;
        this.fetch.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAZoBe_3b33sC9ySoAfmHdtzQjlMAg0lek&maxResults=50&part=snippet&playlistId=PLiVty6-a8hTwboGWLDbQL0ZEjC92atdP3`).subscribe(d => {
          Array.from(d["items"])
          for (let i of d["items"]) i["URL"] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${i.snippet.resourceId.videoId}`);
          this.top10Videos = d;
          this.Observer.next(d);
        });
      });
    }
  }
}
