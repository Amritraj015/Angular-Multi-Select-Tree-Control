import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { GetTreeService } from "src/app/services/get-tree.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  dataSource = new MatTreeNestedDataSource<ITreeNode>();
  @Output() selectedCount = new EventEmitter<number>();
  totalSelectedCount: number;

  constructor(treeService: GetTreeService) {
    this.dataSource.data = treeService.getTree();
    this.totalSelectedCount = 0;
  }

  hasChild = (_: number, node: ITreeNode) =>
    !!node.nodeChildren && node.nodeChildren.length > 0;

  isNodeSelected(node: ITreeNode): void {
    let stack = new Stack();

    //  Toggle the checkbox for the current node
    node.nodeSelected = !node.nodeSelected;

    //  Toggle the checkbox for a node's children
    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      removedNode.nodeSelected = node.nodeSelected;

      if (removedNode.nodeSelected) this.totalSelectedCount++;
      else this.totalSelectedCount--;

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    //  Update the count for the total number of selected nodes
    this.updateCount();
  }

  updateCount(): void {
    this.selectedCount.emit(this.totalSelectedCount);
  }

  getTreeData(): ITreeNode[] {
    return this.dataSource.data;
  }

  ngOnInit() {}
}
