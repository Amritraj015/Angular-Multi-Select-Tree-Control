import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from "@angular/core";
import { GetTreeService } from "src/app/services/get-tree.service";
import { FlatTreeNode } from "src/app/classes/flatTreeNode";
import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";
import { TreeNode } from "src/app/classes/TreeNode";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material";

@Component({
  selector: "ms-tree",
  templateUrl: "./test.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  @Output() selectedCount = new EventEmitter<number>();
  totalSelectedNodes: number;

  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.nodeChildren && node.nodeChildren.length > 0,
      treeNode: node,
      level: level
    };
  };

  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.nodeChildren
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(treeService: GetTreeService) {
    this.dataSource.data = treeService.tree;
    this.totalSelectedNodes = 0;
  }

  hasChild = (_: number, node: FlatTreeNode) => node.expandable;

  ngOnInit(): void {
    //this.treeControl.expandAll();
  }

  selectAndExpand(node: FlatTreeNode) {
    let stack = new Stack();
    stack.pushStack(node.treeNode);

    node.treeNode.nodeSelected = !node.treeNode.nodeSelected;
    if (node.treeNode.nodeSelected) {
      this.treeControl.expandDescendants(node);
      this.totalSelectedNodes++;
    } else this.totalSelectedNodes--;

    while (stack.stack.length !== 0) {
      let removedNode = stack.popStack();

      if (node.treeNode.nodeSelected)
        if (!removedNode.nodeSelected) this.totalSelectedNodes++;

      if (!node.treeNode.nodeSelected)
        if (removedNode.nodeSelected) this.totalSelectedNodes--;

      removedNode.nodeSelected = node.treeNode.nodeSelected;
      for (let child of removedNode.nodeChildren) stack.pushStack(child);
    }

    this.selectedCount.emit(this.totalSelectedNodes);
  }
}
