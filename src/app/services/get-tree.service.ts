import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { MatTreeNestedDataSource } from "@angular/material";
import { TestTree } from "../testData/testTree";
import { OrgUnitsDataSet } from "../testData/orgUnits";
import { Stack } from "../classes/stackForDepthFirstSearch";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  dataSource = new MatTreeNestedDataSource<ITreeNode>();

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

    let newTree: ITreeNode = allNodes[0];

    let treeMap = new Map<ITreeNode, ITreeNode[]>();

    for (let node of allNodes) {
      // if(tree)
    }

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
    return [newTree];
    //=====================================================

    //=====================================================
    //  LARGE SIZE DATASET
    //=====================================================

    //=====================================================
  }
}
