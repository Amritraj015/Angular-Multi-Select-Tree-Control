import { TreeNode } from "./TreeNode";

export class FlatTreeNode {
  constructor(
    public node: TreeNode,
    public level = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false
  ) {}
}
