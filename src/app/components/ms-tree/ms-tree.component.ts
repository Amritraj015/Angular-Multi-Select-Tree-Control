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
import { IfStmt } from "@angular/compiler";

@Component({
  selector: "ms-tree",
  templateUrl: "./test.html",
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
      // this.treeControl.dataNodes[i].treeNode.nodeSearchBreanch = true;
      this.treeControl.dataNodes[i].treeNode.nodeInactive = true;
      this.treeControl.dataNodes[j].treeNode.nodeAuthorized = false;
    }
    this.treeControl.expand(this.treeControl.dataNodes[0]);

    // this.fullDataSource[0] = this.treeControl.dataNodes[0].treeNode;
  }

  ngAfterViewInit() {
    // console.log(this.tree);
    // console.log(this.fullDataSource);
    // this.virtualScroll.renderedRangeStream.subscribe(range => {
    //   this.dataSource.data = this.fullDataSource.slice(range.start, range.end);
    // });
  }

  checkNodeSelection(): boolean {
    return this.totalSelectedNodes > 0;
  }

  checkChildren = (node: FlatTreeNode) => !node.expandable;

  toggleNode(node: FlatTreeNode): void {
    if (this.treeControl.isExpanded(node)) this.treeControl.collapse(node);
    else this.treeControl.expand(node);
  }

  providePaddingForNode(node: FlatTreeNode): object {
    return { "margin-left": node.level * 5 + "%" };
  }

  storeTabIndex($event: number): void {
    this.currentTabIndex = $event;

    if (this.currentTabIndex === 1)
      this.buildTreeForShowSelectedTab(this.selectedNodes);
  }

  private buildTreeForShowSelectedTab(selectedNodes: Set<TreeNode>) {
    for (let node of this.treeControl.dataNodes)
      node.treeNode.nodeDescendantSelected = false;

    selectedNodes.forEach(node => {
      let stack = new Stack();
      let queue = new Queue();
      let selectedNodeFound: boolean = false;
      let lastNode: TreeNode;
      queue.Enqueue(this.dataSource.data[0]);
      stack.pushStack(this.dataSource.data[0]);

      while (stack.stack.length !== 0) {
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
            removedNodeFromStack.nodeDescendantSelected = true;
            lastNode = removedNodeFromStack;
          }
        }
      }
    });
  }

  selectAndExpand(node: FlatTreeNode) {
    let stack = new Stack();
    stack.pushStack(node.treeNode);

    node.treeNode.nodeSelected = !node.treeNode.nodeSelected;
    node.treeNode.nodeDescendantSelected = !node.treeNode
      .nodeDescendantSelected;

    if (this.nodesFoundOnSearch) {
      const descendanats = this.treeControl.getDescendants(node);
      for (let descendanat of descendanats)
        descendanat.treeNode.nodeSearchBreanch = true;
    }

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

  private displaySelectionNotification(node: FlatTreeNode) {
    if (node.expandable && node.treeNode.nodeSelected)
      this.snackBar.open("All Descendants Selected!", "", { duration: 2000 });
    else if (node.expandable && !node.treeNode.nodeSelected)
      this.snackBar.open("All Descendants Unselected!", "", { duration: 2000 });
  }

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

      console.log(matchedNames);

      if (matchedNames.size > 0) {
        this.nodesFoundOnSearch = true;
        this.buildTreeForSearchedNode(matchedNames);
      } else this.nodesFoundOnSearch = false;
    }
  }

  private buildTreeForSearchedNode(matchedNames: Set<string>): void {
    for (let node of this.treeControl.dataNodes) {
      node.treeNode.nodeSearchBreanch = false;
    }

    matchedNames.forEach(name => {
      let stack = new Stack();
      let queue = new Queue();
      let matchFound: boolean = false;
      let lastNode: TreeNode;
      queue.Enqueue(this.dataSource.data[0]);
      stack.pushStack(this.dataSource.data[0]);

      if (this.dataSource.data[0].nodeName === name) {
        this.dataSource.data[0].nodeSearchBreanch = true;
        queue.Dequeue();
        stack.popStack();
      }

      while (stack.stack.length !== 0) {
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

            //if (removedNodeFromQueue.nodeSearchBreanch) break;
            queue.Enqueue(child);
          }
        } else {
          let removedNodeFromStack: TreeNode = stack.popStack();

          if (removedNodeFromStack.nodeID === lastNode.nodeParentID) {
            removedNodeFromStack.nodeSearchBreanch = true;
            lastNode = removedNodeFromStack;
          }

          //if (removedNodeFromStack.nodeSearchBreanch) break;
        }
      }
    });

    this.treeControl.expandAll();
  }
}
