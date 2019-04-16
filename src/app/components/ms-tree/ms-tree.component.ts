import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { GetTreeService } from "src/app/services/get-tree.service";
import { FlatTreeNode } from "src/app/classes/FlatTreeNode";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Stack } from "src/app/classes/Stack";
import { TreeNode } from "src/app/classes/TreeNode";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatSnackBar
} from "@angular/material";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Queue } from "src/app/classes/Queue";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  dataSource: MatTreeFlatDataSource<TreeNode, FlatTreeNode>;
  treeControl: FlatTreeControl<FlatTreeNode>;
  totalSelectedNodes: number;
  @Output() selectedCountEvent = new EventEmitter<number>();
  selectedNodes: Set<TreeNode>;
  currentTabIndex: number;
  nodesFoundOnSearch: boolean;

  // fullDataSource: TreeNode[];
  // @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  private transformer = (node: TreeNode, level: number) => {
    return new FlatTreeNode(
      node,
      level,
      !!node.nodeChildren && node.nodeChildren.length > 0
    );
  };

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.nodeChildren
  );

  constructor(
    public treeService: GetTreeService,
    private snackBar: MatSnackBar
  ) {
    this.treeControl = new FlatTreeControl<FlatTreeNode>(
      node => node.level,
      node => node.expandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    // this.fullDataSource = [];
    this.dataSource.data = treeService.tree;
    this.currentTabIndex = 0;
    this.selectedNodes = new Set();
    this.nodesFoundOnSearch = true;
    this.totalSelectedNodes = 0;
  }

  ngOnInit(): void {
    for (let i = 100, j = 500; i < 400 && j < 800; i++, j++) {
      this.treeControl.dataNodes[i].treeNode.nodeInactive = true;
      this.treeControl.dataNodes[j].treeNode.nodeAuthorized = false;
    }
    this.treeControl.expand(this.treeControl.dataNodes[0]);

    // this.fullDataSource[0] = this.treeControl.dataNodes[0].treeNode;

    for (let node of this.treeControl.dataNodes)
      if (node.treeNode.nodeSelected) this.selectedNodes.add(node.treeNode);
  }

  ngAfterViewInit() {
    // console.log(this.tree);
    // console.log(this.fullDataSource);
    // this.virtualScroll.renderedRangeStream.subscribe(range => {
    //   this.dataSource.data = this.fullDataSource.slice(range.start, range.end);
    // });
  }

  trackTreeNodes = (index: number, node: FlatTreeNode) => node.treeNode.nodeID;

  //==========================================================================
  /** Checks if atleast one tree node is selected */
  checkNodeSelection(): boolean {
    return this.totalSelectedNodes > 0;
  }

  //==========================================================================
  /** Checks if a given tree node has child nodes */
  checkChildren = (node: FlatTreeNode) => !node.expandable;

  //==========================================================================
  /** Toggles the expand/collapse state of an expandable tree node */
  toggleNode(node: FlatTreeNode): void {
    if (this.treeControl.isExpanded(node)) this.treeControl.collapse(node);
    else this.treeControl.expand(node);
  }

  //==========================================================================
  /** Provide padding to tree node based on their level */
  providePaddingForNode(node: FlatTreeNode): object {
    return { "margin-left": node.level * 5 + "%" };
  }

  //==========================================================================
  /** Stores the current Tab index and calls a helper method
   * to build the tree for the `Show Selected` Tab */
  storeTabIndex($event: number): void {
    this.currentTabIndex = $event;

    if (this.currentTabIndex === 1)
      this.buildTreeForShowSelectedTab(this.selectedNodes);
  }

  //==========================================================================
  /** Builds the tree for the `Show Selected` Tab */
  private buildTreeForShowSelectedTab(selectedNodes: Set<TreeNode>) {
    for (let node of this.treeControl.dataNodes)
      node.treeNode.nodeDescendantSelected = false;

    selectedNodes.forEach(node => {
      let stack = new Stack();
      let queue = new Queue();
      let selectedNodeFound: boolean = false;
      let lastNode: TreeNode = this.dataSource.data[0];
      queue.Enqueue(this.dataSource.data[0]);

      if (node.nodeID === this.dataSource.data[0].nodeID) {
        selectedNodeFound = true;
        stack.pushStack(queue.Dequeue());
        this.dataSource.data[0].nodeDescendantSelected = true;
      }

      do {
        if (!selectedNodeFound) {
          let removedNodeFromQueue: TreeNode = queue.Dequeue();
          stack.pushStack(removedNodeFromQueue);

          for (let child of removedNodeFromQueue.nodeChildren) {
            stack.pushStack(child);

            if (child.nodeID === node.nodeID) {
              lastNode = child;
              lastNode.nodeDescendantSelected = true;
              selectedNodeFound = true;
              break;
            }

            queue.Enqueue(child);
          }
        } else {
          let removedNodeFromStack: TreeNode = stack.popStack();

          if (removedNodeFromStack.nodeID === lastNode.nodeParentID) {
            if (removedNodeFromStack.nodeDescendantSelected) break;
            removedNodeFromStack.nodeDescendantSelected = true;
            lastNode = removedNodeFromStack;
          }
        }
      } while (stack.stack.length !== 0);
    });
  }

  //==========================================================================
  /** 1) Selects All descendants of a given node.
   * 2) Expands the provided node (Only first level children)
   */
  selectAndExpand(node: FlatTreeNode) {
    let stack = new Stack();
    stack.pushStack(node.treeNode);

    node.treeNode.nodeSelected = !node.treeNode.nodeSelected;
    this.treeControl.expand(node);

    if (node.treeNode.nodeSelected) {
      this.totalSelectedNodes++;
    } else this.totalSelectedNodes--;

    while (stack.stack.length !== 0) {
      let removedNode = stack.popStack();

      if (node.treeNode.nodeSelected) {
        if (!removedNode.nodeSelected && removedNode.nodeAuthorized)
          this.totalSelectedNodes++;
      }

      if (!node.treeNode.nodeSelected) {
        if (removedNode.nodeSelected && removedNode.nodeAuthorized)
          this.totalSelectedNodes--;
      }

      if (removedNode.nodeAuthorized) {
        removedNode.nodeSelected = node.treeNode.nodeSelected;

        if (removedNode.nodeSelected) this.selectedNodes.add(removedNode);
        else this.selectedNodes.delete(removedNode);

        if (this.currentTabIndex === 1)
          removedNode.nodeDescendantSelected = true;
      }

      for (let child of removedNode.nodeChildren) stack.pushStack(child);
    }

    this.displaySelectionNotification(node);
    this.selectedCountEvent.emit(this.totalSelectedNodes);
  }

  //==========================================================================
  /** Displays a snackbar notification on expandable node selection/unselection */
  private displaySelectionNotification(node: FlatTreeNode) {
    if (node.expandable && node.treeNode.nodeSelected)
      this.snackBar.open("All Descendants Selected!", "", { duration: 2000 });
    else if (node.expandable && !node.treeNode.nodeSelected)
      this.snackBar.open("All Descendants Unselected!", "", { duration: 2000 });
  }

  //==========================================================================
  /** Build a set of matching tree nodes on search */
  findMatchingTreeNodes(searchTerm: string): void {
    if (searchTerm === null || searchTerm === "") {
      for (let node of this.treeControl.dataNodes)
        node.treeNode.nodeSearchBreanch = true;

      this.treeControl.collapseAll();
      this.treeControl.expand(this.treeControl.dataNodes[0]);
      this.nodesFoundOnSearch = true;
      return;
    }

    if (searchTerm.length > 1) {
      let matchedNames = new Set();
      let pattern = searchTerm
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        .split(" ")
        .filter(splitTerm => {
          return splitTerm.length > 1;
        })
        .join("|");

      let regExp = new RegExp(pattern, "gi");

      if (this.currentTabIndex === 0) {
        for (let node of this.treeControl.dataNodes) {
          if (regExp.test(node.treeNode.nodeName)) {
            matchedNames.add(
              node.treeNode.nodeName.replace(
                regExp,
                matchedString => matchedString
              )
            );
          }
        }
      } else {
        this.selectedNodes.forEach(node => {
          if (regExp.test(node.nodeName)) {
            matchedNames.add(
              node.nodeName.replace(regExp, matchedString => matchedString)
            );
          }
        });
      }

      if (matchedNames.size > 0) {
        this.nodesFoundOnSearch = true;
        this.buildTreeForSearchedNode(matchedNames);
      } else this.nodesFoundOnSearch = false;
    }
  }

  //==========================================================================
  /** Build the tree when nodes are searched */
  private buildTreeForSearchedNode(matchedNames: Set<string>): void {
    for (let node of this.treeControl.dataNodes)
      node.treeNode.nodeSearchBreanch = false;

    matchedNames.forEach(name => {
      let stack = new Stack();
      let queue = new Queue();
      let matchFound: boolean = false;
      let lastNode: TreeNode = this.dataSource.data[0];
      queue.Enqueue(this.dataSource.data[0]);

      if (this.dataSource.data[0].nodeName === name) {
        this.dataSource.data[0].nodeSearchBreanch = true;
        stack.pushStack(queue.Dequeue());
        matchFound = true;
      }

      do {
        if (!matchFound) {
          let removedNodeFromQueue: TreeNode = queue.Dequeue();
          stack.pushStack(removedNodeFromQueue);

          for (let child of removedNodeFromQueue.nodeChildren) {
            stack.pushStack(child);

            if (child.nodeName === name) {
              lastNode = child;
              lastNode.nodeSearchBreanch = true;
              matchFound = true;
              break;
            }

            queue.Enqueue(child);
          }
        } else {
          let removedNodeFromStack: TreeNode = stack.popStack();

          if (removedNodeFromStack.nodeID === lastNode.nodeParentID) {
            if (removedNodeFromStack.nodeSearchBreanch) break;
            removedNodeFromStack.nodeSearchBreanch = true;
            lastNode = removedNodeFromStack;
          }
        }
      } while (stack.stack.length !== 0);
    });

    this.treeControl.expandAll();
  }
}
