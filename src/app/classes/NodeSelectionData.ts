import { TreeNode } from "./TreeNode";

/** A class to encapsulate the node selection data. This data is then emitted to the page that embeds the control */
export class NodeSelectionData {
  /** A set of all the nodes that are selected */
  allSelectedNodes: Set<TreeNode>;

  /** Total number of selected nodes */
  totalSelectedCount: number;

  /** A set of all selected inactive nodes */
  inactiveSelectedNodes: Set<TreeNode>;

  /** Total number of inactive selected nodes */
  inactiveSelectedCount: number;
}
