import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { Stack } from "../classes/stackForDepthFirstSearch";
import { MatTreeNestedDataSource } from "@angular/material";
import { TestTree } from "../classes/testTree";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  dataSource = new MatTreeNestedDataSource<ITreeNode>();

  constructor() {
    this.dataSource.data = this.getTree();
    this.dataSource.data = this.fixUnauthorizedNodeHierarchy(
      this.dataSource.data[0]
    );
  }

  private fixUnauthorizedNodeHierarchy(tree: ITreeNode): ITreeNode[] {
    let stack = new Stack();

    stack.pushStack(tree);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (!removedNode.nodeAuthorized) {
        removedNode = this.denyNodeAccessToUser(removedNode);
        continue;
      }
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }
    return [tree];
  }

  private denyNodeAccessToUser(node: ITreeNode): ITreeNode {
    let stack = new Stack();

    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      removedNode.nodeAuthorized = false;

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    return node;
  }

  //    This method will make a request to a server
  //    to deliver an array with the tree object.
  //    *** Since, this is a nested tree control, the array must have
  //    one and only one nested tree object ***

  getTree(): ITreeNode[] {
    let test = new TestTree();
    return test.getTreeData();
  }
}
