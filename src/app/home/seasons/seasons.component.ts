import { Component } from "@angular/core";

@Component({
  selector: "app-seasons",
  templateUrl: "./seasons.component.html",
  styleUrls: ["./seasons.component.scss"]
})

export class SeasonsComponent {

  constructor(){}

  toggleSeasonLinks(e){
    var element = e.target;

    if(element.tagName == "DIV") element.parentNode.classList.toggle("active")
    else if(element.tagName == "P") element.parentNode.parentNode.classList.toggle("active")
    else if(element.tagName == "I") element.parentNode.parentNode.parentNode.classList.toggle("active")
  }

}
