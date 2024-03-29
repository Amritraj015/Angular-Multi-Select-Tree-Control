import { Injectable } from "@angular/core";
import { TreeNode } from "../classes/TreeNode";
import { ITreeNode } from "../Interfaces/ITreeNode";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  tree: TreeNode[];
  flatTreeNodes: ITreeNode[];

  constructor() {
    this.flatTreeNodes = [];
    this.tree = [];
  }

  getTree(): TreeNode[] {
    let nodeChildrenMap = new Map<string, TreeNode[]>();
    let allNodesSet = new Set<TreeNode>();
    let rootCounter: number = 0;

    for (let node of this.flatTreeNodes) {
      const newNode: TreeNode = {
        nodeName: node.nodeName,
        nodeID: node.nodeID,
        nodeParentID: node.nodeParentID,
        nodeAuthorized: node.nodeAuthorized,
        nodeInactive: node.nodeInactive,
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeSearchBreanch: true,
        nodeChildrenLoading: false,
        nodeChildren: []
      };

      if (newNode.nodeParentID === "NULL") rootCounter++;

      allNodesSet.add(newNode);
      nodeChildrenMap.set(newNode.nodeID, []);
    }

    this.buildNestedTree(nodeChildrenMap, allNodesSet, rootCounter);

    return this.tree;
  }

  /** Builds the initial tree for `Show All` Tab*/
  private buildNestedTree(
    nodeChildrenMap: Map<string, TreeNode[]>,
    allNodesSet: Set<TreeNode>,
    rootCounter: number
  ): void {
    if (rootCounter > 1) {
      allNodesSet.forEach(node => {
        if (node.nodeParentID === "NULL") node.nodeParentID = "-1";
      });

      this.tree[0] = {
        nodeName: "Root Node",
        nodeID: "-1",
        nodeParentID: "NULL",
        nodeAuthorized: true,
        nodeInactive: false,
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeSearchBreanch: true,
        nodeChildrenLoading: false,
        nodeChildren: []
      };

      nodeChildrenMap.set(this.tree[0].nodeID, []);
      allNodesSet.add(this.tree[0]);
    } else {
      allNodesSet.forEach(node => {
        if (node.nodeParentID === "NULL") this.tree[0] = node;
      });
    }

    allNodesSet.forEach(node => {
      if (nodeChildrenMap.has(node.nodeParentID)) {
        let children = nodeChildrenMap.get(node.nodeParentID);
        children.push(node);
        nodeChildrenMap.set(node.nodeParentID, children);
      }

      if (nodeChildrenMap.has(node.nodeID))
        node.nodeChildren = nodeChildrenMap.get(node.nodeID);
    });
  }
}
