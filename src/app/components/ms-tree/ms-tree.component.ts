import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { GetTreeService } from "src/app/services/get-tree.service";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  root: ITreeNode;

  constructor(tree: GetTreeService) {
    this.root = tree.getTree();
  }

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

  //  Breadth-First Search Algorithm to render the Tree.
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
