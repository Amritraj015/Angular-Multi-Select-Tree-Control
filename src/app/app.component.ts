import { Component } from "@angular/core";
// import { orgUnits as flatTreeNodes } from "./testData/medium_dataset";
import { tree as flatTreeNodes } from "./testData/small_dataset";
import { ITreeNode } from "./Interfaces/ITreeNode";
// import { personnel as flatTreeNodes } from "./testData/large_dataset";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  flatTree: ITreeNode[];
  disableSearch: boolean;

  constructor() {
    this.disableSearch = false;
    this.flatTree = flatTreeNodes;
  }

  test($event): void {
    console.log($event);
  }
}
