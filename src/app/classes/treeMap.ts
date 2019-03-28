import { ITreeNode } from "../Interfaces/ITreeNode";
import { orgUnits as flatTreeNodes } from "../testData/medium_dataset";
import { FlatTreeNode } from "./flatTreeNode";
import { Stack } from "./stackForDepthFirstSearch";

export class TreeMap {
  treeMap = new Map<ITreeNode, ITreeNode[]>();
  rootLevelNode: ITreeNode[];
  nestedTree: ITreeNode[];

  constructor() {
    this.rootLevelNode = [];
    this.nestedTree = [];
    this.getTree();
  }

  getTree(): any {
    let allNodes: ITreeNode[] = [];

    for (let org of flatTreeNodes) {
      const newNode: ITreeNode = {
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

  buildNestedTree(allNodes: ITreeNode[]): void {
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
  buildTreeMap(allNodes: ITreeNode[]): void {
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

  getChildren(node: ITreeNode): ITreeNode[] | undefined {
    return this.treeMap.get(node);
  }

  isExpandable(node: ITreeNode): boolean {
    return this.treeMap.has(node);
  }
}
