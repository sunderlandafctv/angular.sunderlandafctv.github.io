import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class TriangleService {

  constructor(){}

  triangleEnabled: Observable<Boolean> = new Observable<Boolean>(observer => this.triangleObserver = observer );
  private triangleObserver: Observer<Boolean>;

  showTriangle(){
    this.triangleObserver.next(true)
  }

  hideTriangle(){
    this.triangleObserver.next(false)
  }

}
