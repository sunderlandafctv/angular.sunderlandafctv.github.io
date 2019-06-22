import { Component } from '@angular/core';
import { SearchRequest } from '../search'
import { Router } from '@angular/router';

@Component({
  selector: 'safc-search',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.scss']
})
export class SearchFormComponent {

  constructor(private router: Router) { }

  sq: SearchRequest = new SearchRequest('', 'player');

  search(){
    this.router.navigateByUrl(`/search/${this.sq.queryString}`);
  }

}
