import { ITreeNode } from '../Interfaces/ITreeNode';

export class TreeNode implements ITreeNode{
    nodeName: string;
    nodeID: number;
    nodeChildren: [];
    nodeSelected: boolean;
    nodeVisited: boolean;
}