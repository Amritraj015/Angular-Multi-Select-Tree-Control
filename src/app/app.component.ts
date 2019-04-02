import { Component } from "@angular/core";

@Component({
  selector: "ms-tree-control",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class MSMainComponent {
  totalNodesSelected: number;
  text: string;
  renderTreeDiv: boolean;

  constructor() {
    this.totalNodesSelected = 0;
    this.text = "Select User Groups";
    this.renderTreeDiv = false;
  }

  //==========================================================================
  /**   Calculates the total number of selected nodes everytime
  nodes are selected/un-selected */
  updateSelectedCount(selectedCount: number): void {
    this.totalNodesSelected = selectedCount;
    this.renderTree(true);
  }

  //==========================================================================
  /**   Renders the Selected Count on the expansion pannel header */
  renderTree(firedFromUpdateSelectedCount?: boolean): boolean {
    if (!firedFromUpdateSelectedCount) {
      this.text = !this.renderTreeDiv ? " Selected" : "Select User Groups";
      return (this.renderTreeDiv = !this.renderTreeDiv);
    }

    this.text = " Selected";
  }
}
