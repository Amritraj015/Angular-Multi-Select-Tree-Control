import { TreeNode } from "./TreeNode";

export class FlatTreeNode {
  constructor(
    public treeNode: TreeNode,
    public level,
    public expandable: boolean
  ) {}
}
