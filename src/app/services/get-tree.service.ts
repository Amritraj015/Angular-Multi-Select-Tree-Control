import { Injectable } from "@angular/core";
//import { orgUnits as flatTreeNodes } from "../testData/medium_dataset";
import { Stack } from "../classes/Stack";
import { TreeNode } from "../classes/TreeNode";
//import { tree as flatTreeNodes } from "../testData/small_dataset";
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
    let start = new Date().getTime();
    let allNodes = new Set<TreeNode>();

    for (let node of flatTreeNodes) {
      const newNode: TreeNode = {
        nodeName: node.fullname,
        nodeID: parseInt(node.userid),
        nodeParentID: parseInt(node.manageruserid),
        nodeAuthorized: true,
        nodeInactive: false,
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeSearchBreanch: true,
        nodeChildrenLoading: false,
        nodeChildren: []
      };

      allNodes.add(newNode);
    }

    this.buildNestedTree(allNodes);
    let end = new Date().getTime();
    console.log(end - start + " ms");
  }

  /** Builds the initial tree for `Show All` Tab*/
  buildNestedTree(allNodes: Set<TreeNode>): void {
    console.log("the total number of nodes in allNodes = " + allNodes.size);
    let pseudoRoot: TreeNode[] = [
      {
        nodeName: "Root Node",
        nodeID: -1,
        nodeParentID: NaN,
        nodeAuthorized: true,
        nodeInactive: false,
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeSearchBreanch: true,
        nodeChildrenLoading: false,
        nodeChildren: []
      }
    ];

    allNodes.forEach(node => {
      if (isNaN(node.nodeParentID)) {
        node.nodeParentID = -1;
        pseudoRoot[0].nodeChildren.push(node);
        allNodes.delete(node);
      }
    });

    let queue = new Queue();
    this.tree = [...pseudoRoot];
    for (let child of this.tree[0].nodeChildren) {
      queue.Enqueue(child);
    }
    allNodes.forEach(node => {
      if (node.nodeParentID === child.nodeID) {
        child.nodeChildren.push(node);
      }
    });

    console.log(this.tree);
  }
}
