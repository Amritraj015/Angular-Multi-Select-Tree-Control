import { Injectable } from "@angular/core";
// import { orgUnits as flatTreeNodes } from "../testData/medium_dataset";
import { Stack } from "../classes/Stack";
import { TreeNode } from "../classes/TreeNode";
// import { tree as flatTreeNodes } from "../testData/small_dataset";
import { personnel as flatTreeNodes } from "../testData/large_dataset";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { Queue } from "../classes/Queue";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  tree: TreeNode[];

  constructor() {
    this.tree = [];
    this.getTree();
  }

  getTree(): void {
    let s = new Date().getTime();
    let allNodes = new Map<string, TreeNode[]>();
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

      if (newNode.nodeParentID === "NULL") rootCounter++;

      allNodesSet.add(newNode);
      allNodes.set(newNode.nodeID, []);
      if (allNodes.has(newNode.nodeParentID)) {
        let children = allNodes.get(newNode.nodeParentID);
        children.push(newNode);
        allNodes.set(newNode.nodeParentID, children);
      }
    }

    this.buildNestedTree(allNodes, allNodesSet, rootCounter);
    let e = new Date().getTime();
    console.log(e - s);
  }

  /** Builds the initial tree for `Show All` Tab*/
  buildNestedTree(
    allNodes: Map<string, TreeNode[]>,
    allNodesSet: Set<TreeNode>,
    rootCounter: number
  ): void {
    allNodesSet.forEach(node => {
      if (allNodes.has(node.nodeID))
        node.nodeChildren = allNodes.get(node.nodeID);
    });

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

      allNodesSet.forEach(node => {
        if (node.nodeParentID === "NULL") {
          this.tree[0].nodeChildren.push(node);
        }
      });
    } else {
      allNodesSet.forEach(node => {
        if (node.nodeParentID === "NULL") {
          this.tree.push(node);
        }
      });
    }

    let count = 0;

    let stack = new Stack();
    stack.pushStack(this.tree[0]);

    while (stack.stack.length !== 0) {
      let rn = stack.popStack();

      count++;

      for (let child of rn.nodeChildren) stack.pushStack(child);
    }

    console.log(count);
    console.log(this.tree);
    console.log(allNodesSet);
    console.log(allNodes);
  }
}
