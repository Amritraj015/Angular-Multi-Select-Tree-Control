import { ITreeNode } from "../Interfaces/ITreeNode";
import { OrgUnitsDataSet } from "../testData/medium_dataset";
import { FlatTreeNode } from "./flatTreeNode";
import { map } from "rxjs/operators";

export class TreeMap {
  treeMap = new Map<number, number[]>();
  rootLevelNode: number[];
  allNodes: ITreeNode[];

  constructor() {
    this.allNodes = [];
    this.rootLevelNode = [];
    this.getTree();
  }

  getTree(): any {
    let tree = new OrgUnitsDataSet();

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

      this.allNodes.push(newNode);
    }
    this.rootLevelNode.push(this.allNodes[0].nodeID);

    this.buildTreeMap(this.allNodes);
  }

  /** Biuld the Tree Map */
  buildTreeMap(allNodes: ITreeNode[]): void {
    this.treeMap.set(allNodes[0].nodeID, []);

    for (let node of allNodes) {
      for (let i = allNodes.indexOf(node); i < allNodes.length; i++) {
        if (this.treeMap.has(node.nodeID)) {
          if (node.nodeID === allNodes[i].nodeParentID) {
            let children = this.treeMap.get(node.nodeID);
            children.push(allNodes[i].nodeID);

            this.treeMap.set(node.nodeID, children);
          }
        } else {
          this.treeMap.set(node.nodeID, []);
        }
      }

      if (this.treeMap.get(node.nodeID).length === 0)
        this.treeMap.delete(node.nodeID);
    }
  }

  initialTreeNode(): FlatTreeNode[] {
    return this.rootLevelNode.map(node => new FlatTreeNode(node, 0, true));
  }

  getChildren(nodeID: number): number[] | undefined {
    return this.treeMap.get(nodeID);
  }

  isExpandable(nodeID: number): boolean {
    return this.treeMap.has(nodeID);
  }
}
