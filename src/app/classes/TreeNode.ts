import { ITreeNode } from "../Interfaces/ITreeNode";

export class TreeNode implements ITreeNode {
  // Interface properties
  nodeName: string;
  nodeID: number;
  nodeParentID: number;
  nodeAuthorized: boolean;
  nodeInactive: boolean;

  /** Children of a given node.
    
  Total number of children for a node ∈ Z+ */
  nodeChildren: TreeNode[];

  /** Represents if a node is selected.

  `true` if a node is selected else `false` */
  nodeSelected: boolean;

  /** Represents if any descendant of a current node is selected.
    
  `true` if at least one descendant is selected else `false`*/
  nodeDescendantSelected: boolean;

  /** Represents if the node lies on the branch of a node being searched
  
  `true` if the node lies on the branch of a searched node else `false`.
  Value must be `true` for the node being searched itself.
  `nodeSearchBreanch = false` (by default), when being fed to the control */
  nodeSearchBreanch: boolean;

  /** Represents if a node's children are being loaded on to the DOM
   *
   * `true` if a node's children are being loaded else `false`
   */
  nodeChildrenLoading: boolean;
}
