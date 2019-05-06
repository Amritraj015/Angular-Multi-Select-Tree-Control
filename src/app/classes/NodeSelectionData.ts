import { TreeNode } from "./TreeNode";

export class NodeSelectionData {
  allSelectedNodes: Set<TreeNode>;
  totalSelectedCount: number;
  inactiveSelectedNodes: Set<TreeNode>;
  inactiveSelectedCount: number;
}
