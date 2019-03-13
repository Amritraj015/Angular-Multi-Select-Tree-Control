import { ITreeNode } from "../Interfaces/ITreeNode";

//  This is a custom Queue class to support the
//  Breadth First Search Algorithms used in the control
export class Queue {
  queue: ITreeNode[];

  constructor() {
    this.queue = [];
  }

  Enqueue(node: ITreeNode): void {
    this.queue.push(node);
  }

  Dequeue(): ITreeNode {
    return this.queue.shift();
  }
}
