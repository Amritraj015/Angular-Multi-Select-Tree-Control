import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { NestedTreeControl } from "@angular/cdk/tree";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";
import { GetTreeService } from "src/app/services/get-tree.service";
import { Queue } from "src/app/classes/queueForBreadthFirstSearch";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  checkSelected: boolean;
  currentTabIndex: number;
  searching: boolean;
  searchingSelected: boolean;
  @Output() selectedCount = new EventEmitter<ITreeNode>();
  @Input() treeIsSearchable: boolean;

  //===========================================================================================
  //  call service to get the tree
  constructor(public treeInit: GetTreeService) {
    this.searching = false;
    this.searchingSelected = false;
    this.checkSelected = false;
    this.currentTabIndex = 0;
  }

  //===========================================================================================
  //  Automatically expand the first level children when the fly-out loads
  ngOnInit(): void {
    this.treeControl.expand(this.treeInit.dataSource.data[0]);
  }

  //===========================================================================================
  //  check if a node has children
  hasChild = (_: number, node: ITreeNode) =>
    !!node.nodeChildren && node.nodeChildren.length > 0;

  //===========================================================================================
  //  check if a node has children
  checkChildren = (node: ITreeNode) => node.nodeChildren.length === 0;

  //===========================================================================================
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

      if (node.nodeSelected && this.currentTabIndex === 1)
        removedNode.nodeDescendantSelected = true;

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    //  Event emission to ms-tree-container to update selection count
    this.selectedCount.emit(this.treeInit.dataSource.data[0]);
  }

  //===========================================================================================
  //  Checks if any node is selected in the tree
  //  Used for conditional rendering of "None Selected" if no tree nodes have been selected
  checkNodeSelection($tabIndex: number): void {
    this.checkSelected = false;
    this.currentTabIndex = $tabIndex;

    if ($tabIndex === 1) {
      this.searchingSelected = false;
      this.treeControl.expandDescendants(this.treeInit.dataSource.data[0]);

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
    } else {
      this.searching = false;
      this.treeControl.collapseAll();
      this.treeControl.expand(this.treeInit.dataSource.data[0]);
    }
  }

  //===========================================================================================
  //  Functions to initialize "nodeDescendantSelected" property to display Selected nodes
  //  on "Show Selected" Tab
  private CheckDescendantsSelection(): void {
    let stack = new Stack();

    stack.pushStack(this.treeInit.dataSource.data[0]);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      removedNode.nodeDescendantSelected = false;

      if (this.checkChildren(removedNode) && removedNode.nodeAuthorized)
        this.SelectedNodesOnBranch(removedNode);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }
  }

  private SelectedNodesOnBranch(node: ITreeNode) {
    let queue = new Queue();
    queue.Enqueue(this.treeInit.dataSource.data[0]);

    while (queue.queue.length !== 0) {
      let removedNode: ITreeNode = queue.Dequeue();

      if (node.nodeSelected) {
        node.nodeDescendantSelected = true;
      }

      if (node.nodeParentID === removedNode.nodeID) {
        if (node.nodeDescendantSelected)
          removedNode.nodeDescendantSelected = true;

        node = removedNode;
        queue.queue = [];
        queue.Enqueue(this.treeInit.dataSource.data[0]);
        continue;
      }

      for (let newNode of removedNode.nodeChildren) queue.Enqueue(newNode);
    }
  }

  //===========================================================================================
  //  Search functions for the "Show All" and "Show Selected" Tabs
  extractNodes($searchString: string): void {
    let stack = new Stack();

    this.isSearchInProgress($searchString);
    stack.pushStack(this.treeInit.dataSource.data[0]);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      removedNode.nodeSearchBreanch = false;

      if (removedNode.nodeAuthorized && this.checkChildren(removedNode))
        this.searchNode(removedNode, $searchString);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }
  }

  private isSearchInProgress($searchString: string): void {
    if ($searchString !== null && $searchString.length > 1) {
      if (this.currentTabIndex === 0) this.searching = true;
      else this.searchingSelected = true;
    } else {
      if (this.currentTabIndex === 0) {
        this.searching = false;
        this.treeControl.collapseAll();
        this.treeControl.expand(this.treeInit.dataSource.data[0]);
      } else {
        this.searchingSelected = false;
        this.treeControl.expandDescendants(this.treeInit.dataSource.data[0]);
      }
    }
  }

  private searchNode(node: ITreeNode, $searchString: string) {
    let queue = new Queue();
    queue.Enqueue(this.treeInit.dataSource.data[0]);

    while (queue.queue.length !== 0) {
      let removedNode: ITreeNode = queue.Dequeue();

      if (node.nodeName === $searchString) {
        node.nodeSearchBreanch = true;
        if (this.currentTabIndex === 0)
          this.treeControl.expandDescendants(this.treeInit.dataSource.data[0]);
      }

      if (node.nodeParentID === removedNode.nodeID) {
        if (node.nodeSearchBreanch) removedNode.nodeSearchBreanch = true;

        node = removedNode;
        queue.queue = [];
        queue.Enqueue(this.treeInit.dataSource.data[0]);
        continue;
      }

      for (let newNode of removedNode.nodeChildren) queue.Enqueue(newNode);
    }
  }

  //===========================================================================================
  //  Select Functionality while searching tree nodes
  selectOnSearch(node: ITreeNode): void {
    let stack = new Stack();

    node.nodeSelected = !node.nodeSelected;
    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (removedNode.nodeAuthorized) {
        removedNode.nodeSelected = node.nodeSelected;
        removedNode.nodeSearchBreanch = true;
      }

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    this.treeControl.expandDescendants(node);

    //  Event emission to ms-tree-container to update selection count
    this.selectedCount.emit(this.treeInit.dataSource.data[0]);
  }
}
