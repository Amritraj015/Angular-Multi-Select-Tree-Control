import { Component, Input, ElementRef, SecurityContext } from "@angular/core";
import { TreeNode } from "src/app/classes/TreeNode";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "ms-tree-control",
  templateUrl: "./ms-tree-control.component.html",
  styleUrls: ["./ms-tree-control.component.less"]
})
export class MsTreeControlComponent {
  totalNodesSelected: number;
  headerText: string;
  renderTreeDiv: boolean;
  flatTreeNodes: string;
  @Input() disableSearch: boolean;

  constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {
    this.flatTreeNodes = this.sanitizer.sanitize(
      SecurityContext.HTML,
      this.elementRef.nativeElement.getAttribute("flatTreeNodes")
    );

    console.log(this.flatTreeNodes);

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
