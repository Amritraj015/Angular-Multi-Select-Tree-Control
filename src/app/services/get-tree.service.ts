import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { MatTreeNestedDataSource } from "@angular/material";
import { TestTree } from "../testData/testTree";
import { OrgUnitsDataSet } from "../testData/orgUnits";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  dataSource = new MatTreeNestedDataSource<ITreeNode>();
  rootLevelNode: number;

  constructor() {
    this.dataSource.data = this.getTree();
  }

  //    This method will make a request to a server
  //    to deliver an array with the tree object.
  //    *** Since, this is a nested tree control, the array must have
  //    one and only one nested tree object ***

  getTree(): ITreeNode[] {
    //=====================================================
    //  SMALL SIZE DATASET
    //=====================================================
    // let test = new TestTree();
    // return test.getTreeData();
    //=====================================================

    //=====================================================
    //  MEDIUM SIZE DATASET
    //=====================================================
    let tree = new OrgUnitsDataSet();
    let allNodes: ITreeNode[] = [];

    for (let org of tree.orgUnits) {
      var newNode: ITreeNode = {
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

    let treeMap = new Map<number, number[]>();
    treeMap.set(allNodes[0].nodeID, []);
    let count = 0;
    for (let node of allNodes) {
      for (let i = allNodes.indexOf(node); i < allNodes.length; i++) {
        if (treeMap.has(node.nodeID)) {
          if (node.nodeID === allNodes[i].nodeParentID) {
            let children = treeMap.get(node.nodeID);
            children.push(allNodes[i].nodeID);
            treeMap.set(node.nodeID, children);
          }
        } else {
          treeMap.set(node.nodeID, []);
        }
      }
      count += treeMap.get(node.nodeID).length;
      if (treeMap.get(node.nodeID).length === 0) treeMap.delete(node.nodeID);
    }
    this.rootLevelNode = allNodes[0].nodeID;

    console.log(this.rootLevelNode);
    console.log(count);
    console.log(treeMap);

    // let stack = new Stack();
    // stack.pushStack(newTree);

    // for (let node of allNodes) {
    //   stack.popStack();
    //   for (let newNode of allNodes) {
    //     if (newNode.nodeParentID === node.nodeID) {
    //       node.nodeChildren.push(newNode);
    //       stack.pushStack(newNode);
    //     }
    //   }
    // }

    // console.log(newTree);
    let newTree: ITreeNode = allNodes[0];
    return [newTree];
    //=====================================================

    //=====================================================
    //  LARGE SIZE DATASET
    //=====================================================

    //=====================================================
  }
}
