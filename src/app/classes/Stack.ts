import { TreeNode } from "./TreeNode";

/**   This is a custom Stack class to support the
Depth First Search Algorithms used in the control */
export class Stack {
  stack: TreeNode[];

  constructor() {
    this.stack = [];
  }

  pushStack(treeNode: TreeNode): void {
    this.stack.push(treeNode);
  }

  popStack(): TreeNode {
    return this.stack.pop();
  }
}
