import { ITreeNode } from "../Interfaces/ITreeNode";
import { orgUnits as flatTreeNodes } from "../testData/medium_dataset";
import { FlatTreeNode } from "./flatTreeNode";
import { Stack } from "./stackForDepthFirstSearch";
import { TreeNode } from "./TreeNode";

export class TreeMap {
  treeMap = new Map<TreeNode, TreeNode[]>();
  rootLevelNode: TreeNode[];
  nestedTree: TreeNode[];

  constructor() {
    this.rootLevelNode = [];
    this.nestedTree = [];
    this.getTree();
  }

  getTree(): any {
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

    this.rootLevelNode.push(allNodes[0]);
    this.buildTreeMap(allNodes);
    this.buildNestedTree(allNodes);
  }

  buildNestedTree(allNodes: TreeNode[]): void {
    let stack = new Stack();
    this.nestedTree[0] = allNodes[0];
    stack.pushStack(this.nestedTree[0]);

    for (let node of allNodes) {
      stack.popStack();
      for (let newNode of allNodes) {
        if (newNode.nodeParentID === node.nodeID) {
          node.nodeChildren.push(newNode);
          stack.pushStack(newNode);
        }
      }
    }
    console.log(this.nestedTree);
  }

  /** Biuld the Tree Map */
  buildTreeMap(allNodes: TreeNode[]): void {
    this.treeMap.set(allNodes[0], []);

    for (let node of allNodes) {
      for (let i = allNodes.indexOf(node); i < allNodes.length; i++) {
        if (this.treeMap.has(node)) {
          if (node.nodeID === allNodes[i].nodeParentID) {
            let children = this.treeMap.get(node);
            children.push(allNodes[i]);

            this.treeMap.set(node, children);
          }
        } else {
          this.treeMap.set(node, []);
        }
      }

      if (this.treeMap.get(node).length === 0) this.treeMap.delete(node);
    }
  }

  initialTreeNode(): FlatTreeNode[] {
    return this.rootLevelNode.map(node => new FlatTreeNode(node, 0, true));
  }

  getChildren(node: TreeNode): TreeNode[] | undefined {
    return this.treeMap.get(node);
  }

  isExpandable(node: TreeNode): boolean {
    return this.treeMap.has(node);
  }
}
