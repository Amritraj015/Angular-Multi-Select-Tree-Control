import { Injectable } from "@angular/core";
import { orgUnits as flatTreeNodes } from "../testData/medium_dataset";
import { Stack } from "../classes/stackForDepthFirstSearch";
import { TreeNode } from "../classes/TreeNode";

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
    let allNodes: TreeNode[] = [];

    for (let org of flatTreeNodes) {
      const newNode: TreeNode = {
        nodeName: org.companyname,
        nodeID: parseInt(org.companyid),
        nodeParentID: parseInt(org.parentid),
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeAuthorized: true,
        nodeInactive: false,
        nodeSearchBreanch: false,
        nodeChildren: []
      };

      allNodes.push(newNode);
    }
    this.buildNestedTree(allNodes);
  }

  buildNestedTree(allNodes: TreeNode[]): void {
    let stack = new Stack();
    this.tree[0] = allNodes[0];
    stack.pushStack(this.tree[0]);

    for (let node of allNodes) {
      stack.popStack();
      for (let newNode of allNodes) {
        if (newNode.nodeParentID === node.nodeID) {
          node.nodeChildren.push(newNode);
          stack.pushStack(newNode);
        }
      }
    }
  }
}
