import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { GetTreeService } from "src/app/services/get-tree.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { MSTreeContainerComponent } from "../ms-tree-container/ms-tree-container.component";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  dataSource = new MatTreeNestedDataSource<ITreeNode>();

  constructor(treeService: GetTreeService) {
    this.dataSource.data = treeService.getTree();
  }

  hasChild = (_: number, node: ITreeNode) =>
    !!node.nodeChildren && node.nodeChildren.length > 0;

  isNodeSelected(node): void {
    let stack = new Stack();

    //  Toggle the checkbox for the current node
    node.nodeSelected = !node.nodeSelected;

    //  Toggle the checkbox for a node's children
    if (node.nodeChildren.length > 0) {
      stack.pushStack(node);

      while (stack.stack.length > 0) {
        let removedNode: ITreeNode = stack.popStack();
        removedNode.nodeSelected = node.nodeSelected;
        for (let newNode of removedNode.nodeChildren) {
          stack.pushStack(newNode);
        }
      }
    }
  }

  updateCount(): void {
    let countUpdate = new MSTreeContainerComponent();
    countUpdate.updateSelectedCount(this.dataSource.data[0]);
  }

  getTreeData(): ITreeNode[] {
    return this.dataSource.data;
  }

  ngOnInit() {}
}
