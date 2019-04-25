import { Component } from "@angular/core";
import { ITreeNode } from "./Interfaces/ITreeNode";
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
    this.flatTree = JSON.stringify(flatTreeNodes);
    //console.log(JSON.stringify(flatTreeNodes));
    this.disableSearch = true;
  }
}
