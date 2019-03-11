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
  searching: boolean;
  @Output() selectedCount = new EventEmitter<ITreeNode>();

  //  call service to get the tree
  constructor(public treeInit: GetTreeService) {
    this.searching = false;
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

  getcheckSelected(): boolean {
    return this.checkSelected;
  }

  //  Checks if any node is selected in the tree
  //  Used for conditional rendering of "None Selected" if no tree niodes have been selected
  checkNodeSelection($event: number): void {
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
    if (this.getcheckSelected())
      this.dataSource.data[0].nodeDescendantSelected = true;

    for (let leaf of leafNodes) {
      let oldNode: ITreeNode = leaf;
      while (!isNaN(leaf.nodeParentID)) {
        if (leaf.nodeSelected) leaf.nodeDescendantSelected = true;
        else {
          if (oldNode.nodeDescendantSelected)
            leaf.nodeDescendantSelected = true;
        }

        for (let node of allNodes) {
          if (leaf.nodeParentID === node.nodeID) {
            oldNode = leaf;
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

  searchBoxInFocus(focus: string): boolean {
    return focus === "focus";
  }

  //  Used to highlight the search results
  highlightNode($searchString: string): string {
    return $searchString;
  }

  extractNodes($searchString: string): void {
    let stack = new Stack();
    let allNodes: ITreeNode[] = [];
    let leafNodes: ITreeNode[] = [];

    if ($searchString.length > 1) this.searching = true;
    else this.searching = false;

    stack.pushStack(this.treeInit.dataSource.data[0]);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      removedNode.nodeDescendantSelected = false;

      this.checkChildren(removedNode) && removedNode.nodeAuthorized
        ? leafNodes.push(removedNode)
        : allNodes.push(removedNode);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    this.searchNode(allNodes, leafNodes, $searchString);
  }

  private searchNode(
    allNodes: ITreeNode[],
    leafNodes: ITreeNode[],
    $searchString: string
  ) {
    if ($searchString !== null)
      this.dataSource.data[0].nodeSearchBreanch = true;

    for (let leaf of leafNodes) {
      let oldNode: ITreeNode = leaf;
      while (!isNaN(leaf.nodeParentID)) {
        if (leaf.nodeName === $searchString) {
          leaf.nodeSearchBreanch = true;
          this.treeControl.expandDescendants(this.dataSource.data[0]);
        } else {
          if (oldNode.nodeSearchBreanch) leaf.nodeSearchBreanch = true;
        }

        for (let node of allNodes) {
          if (leaf.nodeParentID === node.nodeID) {
            oldNode = leaf;
            leaf = node;
          }
        }
      }
    }
  }

  selectOnSearch(node: ITreeNode): void {
    let stack = new Stack();

    node.nodeSelected = !node.nodeSelected;
    stack.pushStack(node);

    if (node.nodeSelected) this.treeControl.expandDescendants(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (removedNode.nodeAuthorized)
        removedNode.nodeSelected = node.nodeSelected;

      if (node.nodeSelected) removedNode.nodeSearchBreanch = true;
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    //  Event emission to ms-tree-container to update selection count
    this.selectedCount.emit(this.dataSource.data[0]);
  }
}
