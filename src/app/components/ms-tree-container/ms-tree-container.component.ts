import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";

@Component({
  selector: "ms-tree-container",
  templateUrl: "./ms-tree-container.component.html",
  styleUrls: ["./ms-tree-container.component.less"]
})
export class MSTreeContainerComponent implements OnInit {
  count: number;
  text: string;
  renderTreeDiv: boolean;

  constructor() {
    this.count = 0;
    this.text = "Select User Groups";
    this.renderTreeDiv = false;
  }

  updateSelectedCount(tree): void {
    this.count = 0;
    let stack = new Stack();

    stack.pushStack(tree);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (removedNode.nodeSelected) {
        this.count++;
      }
      for (let newNode of removedNode.nodeChildren) {
        stack.pushStack(newNode);
      }
    }
    console.log(this.count);
  }

  renderTree(): boolean {
    console.log(this.count);
    this.text = !this.renderTreeDiv
      ? `${this.count} Selected`
      : "Select User Groups";
    return (this.renderTreeDiv = !this.renderTreeDiv);
  }

  ngOnInit() {}
}
