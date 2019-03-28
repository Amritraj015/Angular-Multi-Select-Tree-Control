/**  This is the interface for a tree node. */
export interface ITreeNode {
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

  /** Used to designate if a node is accessible to a given user/user group.
  
  'true' if the node is accessible by a user/user group else 'false'. */
  nodeAuthorized: boolean;

  /** Represents if a node is inactive.
   
  'true' if a node is inactive else 'false' */
  nodeInactive: boolean;
}
