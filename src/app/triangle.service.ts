import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TriangleService {

  constructor(){}

  triangleEnabled = new Observable<Boolean>(observer => this.triangleObserver = observer );
  triangleObserver: Observer<Boolean>;

  showTriangle(){
    this.triangleObserver.next(true)
  }

  hideTriangle(){
    this.triangleObserver.next(false)
  }

}
