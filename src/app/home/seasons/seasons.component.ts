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
    element.tagName == "BUTTON" ? 
      element.parentNode.parentNode.classList.toggle("active") : //if clicked on the outside wrapper
      element.parentNode.parentNode.parentNode.classList.toggle("active") //if clicked on the inside arrow icon
  }

}
