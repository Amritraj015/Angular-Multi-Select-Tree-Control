//  This is the interface for a tree node.
//
//  This interface will need to be implemented appropriately
//  wherever the Multi-Select Tree control is being integrated.

export interface ITreeNode {
  //    name of the node
  nodeName: string;

  //    ID of a node (unique number which ∈ Z+ for each node)
  nodeID: number;

  //    Parent's ID number for a given node.
  //    Each node can have one and only one parent.
  //    Multiple nodes can have the same parent.
  //
  //    nodeParentID ∈ Z+
  //    nodeParentID = NaN (for root node)
  nodeParentID: number;

  //    children of a given node where: Total number of children ∈ Z+,
  nodeChildren: ITreeNode[];

  //    boolean value to represent if a node is selected.
  //
  //    true = node is selected
  //    false = node is not selected
  nodeSelected: boolean;

  //    'nodeVisisted' is used for the Depth-First Search Algorithm to track if a given
  //    node has been visited already.
  //
  //    The value of this variable is "false" by default and is toggled to "true"
  //    when the respective node has been rendered on the multi-select control display.
  //
  //    true = node visited already
  //    false = node not vivited yet
  nodeDescendantSelected: boolean;

  //    'nodeAuthorized' is used to designate if a given node 'n' is accessible to a given user/user group 'g'
  //    The value of this variable is 'true' if the node is accessible by a user/user group
  //    The value of this variable is 'false' if the node is not accessible by a user/user group
  //    NOTE -> All children under an unauthorized node must also be unauthorized
  nodeAuthorized: boolean;

  //    'nodeInactive' represents if a node is inactive
  //    'true' => node is inactive
  //    'false' => node is active
  nodeInactive: boolean;

  //    'true' if the node lies on the branch of a searched node else 'false'
  nodeSearchBreanch: boolean;
}
