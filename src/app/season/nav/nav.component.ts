import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router:Router){}

  hamburgerActive: Boolean = false;

  ngOnInit(){
    var allowedSeasons = [
      'NULL',
      '1950-1951','1951-1952','1952-1953','1953-1954','1954-1955','1955-1956','1956-1957','1957-1958','1958-1959','1959-1960',
      '1960-1961','1961-1962','1962-1963','1963-1964','1964-1965','1965-1966','1966-1967','1967-1968','1968-1969','1969-1970',
      '1970-1971','1971-1972','1972-1973','1973-1974','1974-1975','1975-1976','1976-1977','1977-1978','1978-1979','1979-1980',
      '1980-1981','1981-1982','1982-1983','1983-1984','1984-1985','1985-1986','1986-1987','1987-1988','1988-1989','1989-1990',
      '1990-1991','1991-1992','1992-1993','1993-1994','1994-1995','1995-1996','1996-1997','1997-1998','1998-1999','1999-2000']
    
    //check if the season is valid
    if(!allowedSeasons.find(e => { return e == this.router.url.split("/")[3] })){
      this.router.navigate(['/404'], { queryParams: { src: "noseason", d: this.router.url.split("/")[3] } });
    }
  }

  //toggle mobile navigation page
  toggleHamburger(){
    this.hamburgerActive = !this.hamburgerActive;
    if(this.hamburgerActive){
      document.querySelector("body").classList.add("noScroll");
    } else{
      document.querySelector("body").classList.remove("noScroll");
    }
  }

  //exit mobile navigation page on clicking a link
  exitHamburgerOnLinkClick(){
    this.hamburgerActive = false;
    document.querySelector("body").classList.remove("noScroll");
  }

}
