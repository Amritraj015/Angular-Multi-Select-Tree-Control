import { ITreeNode } from "../Interfaces/ITreeNode";

//  This is a custom Queue class to support the
//  Depth First Search Algorithms used in the control
export class Stack {
  stack: ITreeNode[];

  constructor() {
    this.stack = [];
  }

  pushStack(treeNode: ITreeNode): void {
    this.stack.push(treeNode);
  }

  popStack(): ITreeNode {
    return this.stack.pop();
  }
}
