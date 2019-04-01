import { TreeNode } from "./TreeNode";

export class FlatTreeNode {
  constructor(
    public node: TreeNode,
    public level,
    public expandable: boolean = false,
    public isLoading: boolean = false
  ) {}
}
