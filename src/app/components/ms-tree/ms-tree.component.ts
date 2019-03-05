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
  checkSelected: boolean;
  currentTabIndex: number;
  @Output() selectedCount = new EventEmitter<ITreeNode>();

  //  call service to get the tree
  constructor(public treeInit: GetTreeService) {
    this.checkSelected = false;
    this.currentTabIndex = 0;
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

  //  Toggle the checkbox for the current node and its descendants
  //  Expand all descendants of a node when 'Selected'
  selectAndExpand(node: ITreeNode): void {
    let stack = new Stack();

    node.nodeSelected = !node.nodeSelected;
    stack.pushStack(node);

    if (node.nodeSelected) this.treeControl.expandDescendants(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (removedNode.nodeAuthorized)
        removedNode.nodeSelected = node.nodeSelected;
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    //  Event emission to ms-tree-container to update selection count
    this.selectedCount.emit(this.dataSource.data[0]);
  }

  //  Checks if any node is selected in the tree
  //  Used for conditional rendering of "None Selected" if no tree niodes have been selected
  checkNodeSelection($event): void {
    this.checkSelected = false;
    this.currentTabIndex = $event;

    if ($event === 1) {
      let stack = new Stack();
      stack.pushStack(this.treeInit.dataSource.data[0]);

      while (stack.stack.length > 0) {
        let removedNode: ITreeNode = stack.popStack();
        if (removedNode.nodeSelected) {
          this.checkSelected = true;
          break;
        }
        for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
      }

      this.CheckDescendantsSelection();
    }
  }

  private CheckDescendantsSelection(): void {
    let stack = new Stack();
    let allNodes: ITreeNode[] = [];
    let leafNodes: ITreeNode[] = [];

    stack.pushStack(this.treeInit.dataSource.data[0]);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      removedNode.nodeDescendantSelected = false;

      this.checkChildren(removedNode) && removedNode.nodeAuthorized
        ? leafNodes.push(removedNode)
        : allNodes.push(removedNode);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    this.SelectedNodesOnBranch(allNodes, leafNodes);
  }

  private SelectedNodesOnBranch(allNodes: ITreeNode[], leafNodes: ITreeNode[]) {
    if (this.grtcheckSelected())
      this.dataSource.data[0].nodeDescendantSelected = true;

    for (let leaf of leafNodes) {
      let oldLeaf: ITreeNode = leaf;
      while (!isNaN(leaf.nodeParentID)) {
        if (leaf.nodeSelected) leaf.nodeDescendantSelected = true;
        else {
          if (oldLeaf.nodeDescendantSelected)
            leaf.nodeDescendantSelected = true;
        }

        for (let node of allNodes) {
          if (leaf.nodeParentID === node.nodeID) {
            oldLeaf = leaf;
            leaf = node;
          }
        }
      }
    }
  }

  selectOnShowSelectedTab(node: ITreeNode): void {
    let stack = new Stack();

    node.nodeSelected = !node.nodeSelected;
    stack.pushStack(node);

    if (node.nodeSelected) this.treeControl.expandDescendants(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (removedNode.nodeAuthorized)
        removedNode.nodeSelected = node.nodeSelected;

      if (node.nodeSelected) removedNode.nodeDescendantSelected = true;
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    //  Event emission to ms-tree-container to update selection count
    this.selectedCount.emit(this.dataSource.data[0]);
  }

  //  Used to highlight the search results
  highlightNode($searchEvent: string): string {
    return $searchEvent;
  }

  grtcheckSelected(): boolean {
    return this.checkSelected;
  }
}
