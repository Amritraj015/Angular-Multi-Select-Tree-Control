import { ITreeNode } from '../Interfaces/ITreeNode';

export class TreeNode implements ITreeNode{
    nodeName: string;
    nodeID: number;
    nodeChildren: [];
    nodeParent: ITreeNode;
    nodeSelected: boolean;
    nodeVisited: boolean;
}