import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { Stack } from "../classes/stackForDepthFirstSearch";
import { MatTreeNestedDataSource } from "@angular/material";
import { TestTree } from "../testData/testTree";
import { OrgUnitsDataSet } from "../testData/orgUnits";
import { Queue } from "../classes/queueForBreadthFirstSearch";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  dataSource = new MatTreeNestedDataSource<ITreeNode>();

  constructor() {
    this.dataSource.data = this.getTree();
    this.dataSource.data = this.fixTreeDataSource(this.dataSource.data[0]);
  }

  private fixTreeDataSource(tree: ITreeNode): ITreeNode[] {
    let stack = new Stack();

    stack.pushStack(tree);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      removedNode.nodeDescendantSelected = false;
      removedNode.nodeSearchBreanch = false;
      removedNode.nodeSelected = false;

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }
    return [tree];
  }

  //    This method will make a request to a server
  //    to deliver an array with the tree object.
  //    *** Since, this is a nested tree control, the array must have
  //    one and only one nested tree object ***

  getTree(): ITreeNode[] {
    let test = new TestTree();
    return test.getTreeData();
  }

  //==============================================================================
}
