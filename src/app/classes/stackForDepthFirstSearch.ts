import { ITreeNode } from "../Interfaces/ITreeNode";

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
