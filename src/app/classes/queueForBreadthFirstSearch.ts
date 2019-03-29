import { TreeNode } from "./TreeNode";

//  This is a custom Queue class to support the
//  Breadth First Search Algorithms used in the control
export class Queue {
  queue: TreeNode[];

  constructor() {
    this.queue = [];
  }

  Enqueue(node: TreeNode): void {
    this.queue.push(node);
  }

  Dequeue(): TreeNode {
    return this.queue.shift();
  }
}
