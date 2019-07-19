import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'safc-app',
  templateUrl: './safc.component.html',
  styleUrls: ['./safc.component.scss']
})

export class AppComponent implements OnInit {
  
  isOffline = false;

  ngOnInit(){
    this.isOffline = !navigator.onLine
  }

  hideModal(){
    this.isOffline = false;
  }

}
