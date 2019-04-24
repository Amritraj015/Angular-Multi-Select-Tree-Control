import { Injectable } from "@angular/core";
// import { orgUnits as flatTreeNodes } from "../testData/medium_dataset";
import { TreeNode } from "../classes/TreeNode";
// import { tree as flatTreeNodes } from "../testData/small_dataset";
import { personnel as flatTreeNodes } from "../testData/large_dataset";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  tree: TreeNode[];

  constructor() {
    this.tree = [];
    this.getTree();
  }

  private getTree(): void {
    let s = new Date().getTime();
    let nodeChildrenMap = new Map<string, TreeNode[]>();
    let allNodesSet = new Set<TreeNode>();
    let rootCounter: number = 0;

    for (let node of flatTreeNodes) {
      const newNode: TreeNode = {
        nodeName: node.fullname,
        nodeID: node.userid,
        nodeParentID: node.manageruserid,
        nodeAuthorized: true,
        nodeInactive: false,
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeSearchBreanch: true,
        nodeChildrenLoading: false,
        nodeChildren: []
      };

      if (newNode.nodeParentID === "NULL") {
        rootCounter++;
        newNode.nodeParentID = "-1";
      }

      allNodesSet.add(newNode);
      nodeChildrenMap.set(newNode.nodeID, []);
    }

    this.buildNestedTree(nodeChildrenMap, allNodesSet, rootCounter);
    let e = new Date().getTime();
    console.log(e - s);
  }

  /** Builds the initial tree for `Show All` Tab*/
  private buildNestedTree(
    nodeChildrenMap: Map<string, TreeNode[]>,
    allNodesSet: Set<TreeNode>,
    rootCounter: number
  ): void {
    if (rootCounter > 1) {
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
        if (node.nodeParentID === "-1") this.tree[0] = node;
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
