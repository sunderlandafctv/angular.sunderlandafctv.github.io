import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute){}

  errorText = "page";

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      var pmtext = params['src'];
      if(pmtext == "noplayer") this.errorText = "player"
      else {
        this.router.navigate([], {
          queryParams: {src: null},
          queryParamsHandling: 'merge'
        })
      }
    });
  }

}
