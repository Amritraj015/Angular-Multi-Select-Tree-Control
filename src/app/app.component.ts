import { Component } from "@angular/core";
import { ITreeNode } from "./Interfaces/ITreeNode";

@Component({
  selector: "ms-tree-control",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class MSMainComponent {
  count: number;
  text: string;
  renderTreeDiv: boolean;

  constructor() {
    this.count = 0;
    this.text = "Select User Groups";
    this.renderTreeDiv = false;
  }

  //==========================================================================
  //  Calculates the total number of selected nodes everytime
  //  nodes are selected/un-selected
  updateSelectedCount(treeObject: ITreeNode): void {
    // let stack = new Stack();
    // stack.pushStack(treeObject);
    // this.count = 0;

    // while (stack.stack.length > 0) {
    //   let removedNode: ITreeNode = stack.popStack();

    //   if (removedNode.nodeSelected) this.count++;

    //   for (let child of removedNode.nodeChildren) stack.pushStack(child);
    // }

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
