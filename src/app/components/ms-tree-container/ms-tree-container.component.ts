import { Component, Input, Output } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";

@Component({
  selector: "ms-tree-container",
  templateUrl: "./ms-tree-container.component.html",
  styleUrls: ["./ms-tree-container.component.less"]
})
export class MSTreeContainerComponent {
  count: number;
  text: string;
  renderTreeDiv: boolean;
  @Input() treeIsSearchable: boolean;

  constructor() {
    this.count = 0;
    this.text = "Select User Groups";
    this.renderTreeDiv = false;
  }

  //==========================================================================
  //  Calculates the total number of selected nodes everytime
  //  nodes are selected/un-selected
  updateSelectedCount(treeObject: ITreeNode): void {
    let stack = new Stack();
    stack.pushStack(treeObject);
    this.count = 0;

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      if (removedNode.nodeSelected) this.count++;

      for (let child of removedNode.nodeChildren) stack.pushStack(child);
    }

    this.renderTree(true);
  }

  //==========================================================================
  //  Renders the Selected Count on the expansion pannel header
  renderTree(firedFromUpdateSelectedCount?: boolean): boolean {
    if (!firedFromUpdateSelectedCount) {
      this.text = !this.renderTreeDiv ? " Selected" : "Select User Groups";
      return (this.renderTreeDiv = !this.renderTreeDiv);
    }

    this.text = " Selected";
    return this.renderTreeDiv;
  }
}
