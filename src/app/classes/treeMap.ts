import { ITreeNode } from "../Interfaces/ITreeNode";
import { OrgUnitsDataSet } from "../testData/medium_dataset";
import { FlatTreeNode } from "./flatTreeNode";

export class TreeMap {
  treeMap = new Map<ITreeNode, ITreeNode[]>();
  rootLevelNode: ITreeNode[];

  constructor() {
    this.rootLevelNode = [];
    this.getTree();
  }

  getTree(): any {
    let tree = new OrgUnitsDataSet();
    let allNodes: ITreeNode[] = [];

    for (let org of tree.orgUnits) {
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
  }

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
