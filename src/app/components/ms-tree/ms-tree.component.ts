import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  leftChild: ITreeNode = {
    nodeName: "leftChild",
    nodeID: 1,
    nodeChildren: [
      {
        nodeName: "leftChild_LeftChild",
        nodeID: 3,
        nodeChildren: [
          {
            nodeName: "amrit",
            nodeID: 5,
            nodeChildren: [
              {
                nodeName: "raj",
                nodeID: 6,
                nodeChildren: [],
                nodeSelected: false,
                nodeVisited: false
              }
            ],
            nodeSelected: false,
            nodeVisited: false
          }
        ],
        nodeSelected: false,
        nodeVisited: false
      },
      {
        nodeName: "rightChild_LeftChild",
        nodeID: 4,
        nodeChildren: [],
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
    nodeChildren: [],
    nodeSelected: false,
    nodeVisited: false
  };

  root: ITreeNode = {
    nodeName: "Root",
    nodeID: 0,
    nodeChildren: [this.leftChild, this.rightChild],
    nodeSelected: false,
    nodeVisited: false
  };

  public tree: ITreeNode[] = [this.root, this.leftChild, this.rightChild];

  //  Depth-First Search Algorithm to render the Tree.
  depthFirstSearch(): void {
    let dfsStack = new DepthFirstSearchStack();
    dfsStack.push(this.root);
    this.root.nodeVisited = true;
    console.log(this.root.nodeVisited);

    while (dfsStack.stack.length !== 0) {
      let actualNode = dfsStack.pop();
      console.log(actualNode.nodeName);

      for (let node of actualNode.nodeChildren) {
        if (!node.nodeVisited) {
          node.nodeVisited = true;
          dfsStack.push(node);
        }
      }
    }
  }

  breadthFirstSearch(): void {
    let bfsQueue = new BreadthFirstSearchQueue();
    this.root.nodeVisited = true;
    bfsQueue.enqueue(this.root);

    while (bfsQueue.queue.length !== 0) {
      let actualNode = bfsQueue.dequeue();
      console.log(actualNode.nodeName);

      for (let node of actualNode.nodeChildren) {
        if (!node.nodeVisited) {
          node.nodeVisited = true;
          bfsQueue.enqueue(node);
        }
      }
    }
  }

  check(): string {
    return `<li> This is a List </li>`;
  }

  ngOnInit() {}
}

//  Custom stack class that is used by the Depth-First Search Algorithm.
class DepthFirstSearchStack {
  stack: ITreeNode[] = [];

  push(value: ITreeNode): void {
    this.stack.push(value);
  }

  pop(): ITreeNode {
    return this.stack.pop();
  }
}

//  Custom queue class that is used by the Breadth-First Search Algorithm
class BreadthFirstSearchQueue {
  queue: ITreeNode[] = [];

  enqueue(treeNode: ITreeNode): void {
    this.queue.unshift(treeNode);
  }

  dequeue(): ITreeNode {
    return this.queue.pop();
  }
}
