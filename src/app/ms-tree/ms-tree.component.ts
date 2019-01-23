import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "../TreeNodeInterface/ITreeNode";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  leftChild: ITreeNode = {
    nodeName: "leftChild",
    nodeID: 1,
    nodeParent: null,
    nodeChildren: [
      {
        nodeName: "childLeftChild",
        nodeID: 3,
        nodeParent: this.leftChild,
        nodeChildren: null,
        nodeSelected: false,
        nodeVisited: false
      }
    ],
    nodeSelected: false,
    nodeVisited: false
  };

  rightChild: ITreeNode = {
    nodeName: "rightChild",
    nodeID: 2,
    nodeParent: null,
    nodeChildren: null,
    nodeSelected: false,
    nodeVisited: false
  };

  root: ITreeNode = {
    nodeName: "Root",
    nodeID: 0,
    nodeParent: null,
    nodeChildren: [this.leftChild, this.rightChild],
    nodeSelected: false,
    nodeVisited: false
  };

  public tree: ITreeNode[] = [this.root, this.leftChild, this.rightChild];

  ngOnInit() {}
}

//  Custom stack class that is used by the Depth-First Search Algorithm.
export class DepthFirstSearchStack {
  stack: ITreeNode[] = [];

  push(value: ITreeNode) {
    this.stack.push(value);
  }

  pop() {
    this.stack.pop();
  }
}
