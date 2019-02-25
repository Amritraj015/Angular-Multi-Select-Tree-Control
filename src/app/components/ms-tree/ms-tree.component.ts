import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";
import { GetTreeService } from "src/app/services/get-tree.service";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  dataSource: MatTreeNestedDataSource<ITreeNode>;

  @Output() selectedCount = new EventEmitter<ITreeNode>();

  constructor(treeInit: GetTreeService) {
    this.dataSource = treeInit.dataSource;
  }

  ngOnInit() {
    //  Automatically expand the first level children when the fly-out loads
    this.treeControl.expand(this.dataSource.data[0]);
  }

  hasChild = (_: number, node: ITreeNode) =>
    !!node.nodeChildren && node.nodeChildren.length > 0;

  checkChildren = (node: ITreeNode) => node.nodeChildren.length === 0;

  selectAndExpand(node: ITreeNode): void {
    let stack = new Stack();

    //  Toggle the checkbox for the current node
    node.nodeSelected = !node.nodeSelected;

    //  Toggle the checkbox for a node's children
    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      if (removedNode.nodeAuthorized)
        removedNode.nodeSelected = node.nodeSelected;

      //  Expand all the childre4n of a given node when 'selected'
      if (removedNode.nodeSelected) this.treeControl.expand(removedNode);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    this.selectedCount.emit(this.dataSource.data[0]);
  }
}
