import { Injectable } from "@angular/core";
import { orgUnits as flatTreeNodes } from "../testData/medium_dataset";
import { FlatTreeNode } from "../classes/flatTreeNode";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  allNodes: FlatTreeNode[];

  constructor() {
    this.allNodes = [];
    this.getTree();
  }

  getTree(): void {
    for (let org of flatTreeNodes) {
      const newFlatNode: FlatTreeNode = {
        node: {
          nodeName: org.companyname,
          nodeID: parseInt(org.companyid),
          nodeParentID: parseInt(org.parentid),
          nodeAuthorized: true,
          nodeInactive: false
        },
        level: 1,
        expandable: true,
        isLoading: false
      };

      this.allNodes.push(newFlatNode);
    }
    console.log(this.allNodes);
  }
}
