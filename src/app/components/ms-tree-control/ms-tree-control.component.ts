import { Component } from "@angular/core";

@Component({
  selector: "ms-tree-control",
  templateUrl: "./ms-tree-control.component.html",
  styleUrls: ["./ms-tree-control.component.less"]
})
export class MsTreeControlComponent {
  totalNodesSelected: number;
  headerText: string;
  renderTreeDiv: boolean;

  constructor() {
    this.totalNodesSelected = 0;
    this.headerText = "Select User Groups";
    this.renderTreeDiv = false;
  }

  //==========================================================================
  /** Updates the node Selection count on the control header */
  updateSelectedCount(selectedCount: number): void {
    this.totalNodesSelected = selectedCount;
    this.renderTree(true);
  }

  //==========================================================================
  /** Renders the Selected Count on the expansion pannel header */
  renderTree(firedFromUpdateSelectedCount?: boolean): boolean {
    if (!firedFromUpdateSelectedCount) {
      this.headerText = !this.renderTreeDiv
        ? " Selected"
        : "Select User Groups";
      return (this.renderTreeDiv = !this.renderTreeDiv);
    }

    this.headerText = " Selected";
  }
}
