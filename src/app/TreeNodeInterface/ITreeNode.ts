//  This is the interface for a tree node
//  This interface will need to be implemented appropriately wherever the Multi-Select Tree control is being integrated

export interface ITreeNode{
    nodeName: string;
    nodeID: number;
    nodeParent: ITreeNode;
    nodeChildren: ITreeNode[];
}