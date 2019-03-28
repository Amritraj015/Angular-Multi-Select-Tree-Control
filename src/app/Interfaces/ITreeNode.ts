/**  This is the interface for a tree node. */
export class ITreeNode {
  /** Name of the node */
  nodeName: string;

  /** ID of a node (unique number which ∈ Z+ for each node) */
  nodeID: number;

  /** Parent's ID number for a given node.
  Each node can have one and only one parent.
  Multiple nodes can have the same parent.
  
  nodeParentID ∈ Z+,
  nodeParentID = NaN (for root node) */
  nodeParentID: number;

  /** Children of a given node.
    
  Total number of children for a node ∈ Z+ */
  nodeChildren: ITreeNode[];

  /** Represents if a node is selected.

  'true' if a node is selected else 'false' */
  nodeSelected: boolean;

  /** Represents if any descendant of a current node is selected.
    
  'true' if at least one descendant is selected else 'false'*/
  nodeDescendantSelected: boolean;

  /** Used to designate if a node is accessible to a given user/user group.
  
  'true' if the node is accessible by a user/user group else 'false'. */
  nodeAuthorized: boolean;

  /** Represents if a node is inactive.
   
  'true' if a node is inactive else 'false' */
  nodeInactive: boolean;

  /** Represents if the node lies on the branch of a node being searched
  
  'true' if the node lies on the branch of a searched node else 'false'.
  Value must be 'true' for the node being searched itself.
  nodeSearchBreanch = false (by default), when being fed to the control */
  nodeSearchBreanch: boolean;
}
