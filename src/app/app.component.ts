import { Component, ViewChild, ElementRef } from "@angular/core";
// import { orgUnits as flatTreeNodes } from "./testData/medium_dataset";
import { tree as flatTreeNodes } from "./testData/small_dataset";
// import { personnel as flatTreeNodes } from "./testData/large_dataset";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  flatTree;
  disableSearch: boolean;
  constructor() {
    this.disableSearch = false;
    this.flatTree = flatTreeNodes;
  }
}
