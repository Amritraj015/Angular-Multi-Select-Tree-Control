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

  //  call service to get the tree
  constructor(treeInit: GetTreeService) {
    this.dataSource = treeInit.dataSource;
  }

  //  Automatically expand the first level children when the fly-out loads
  ngOnInit() {
    this.treeControl.expand(this.dataSource.data[0]);
  }

  //  check if a node has children
  hasChild = (_: number, node: ITreeNode) =>
    !!node.nodeChildren && node.nodeChildren.length > 0;

  //  check if a node has children
  checkChildren = (node: ITreeNode) => node.nodeChildren.length === 0;

  //  Toggle the checkbox for the current node
  //  Toggle the checkbox for a node's children
  //  Expand all the childre4n of a given node when 'selected'
  selectAndExpand(node: ITreeNode): void {
    let stack = new Stack();

    node.nodeSelected = !node.nodeSelected;
    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (removedNode.nodeAuthorized)
        removedNode.nodeSelected = node.nodeSelected;
      if (removedNode.nodeSelected) this.treeControl.expand(removedNode);
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    this.selectedCount.emit(this.dataSource.data[0]);
  }

  highlightNode($searchEvent: string): string {
    return $searchEvent;
  }
}
