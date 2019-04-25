import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
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
import { ITreeNode } from "src/app/Interfaces/ITreeNode";

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
  searchingNodes: boolean;

  @Input() flatTreeNodes: ITreeNode[];
  nodeIDMap = new Map<string, FlatTreeNode>();
  @Input() enableSearch: boolean;

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

    this.currentTabIndex = 0;
    this.selectedNodes = new Set();
    this.nodesFoundOnSearch = true;
    this.totalSelectedNodes = 0;
    this.searchingNodes = false;
  }

  ngOnInit(): void {
    this.treeService.flatTreeNodes = this.flatTreeNodes;

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.dataSource.data = this.treeService.getTree();

    for (let node of this.treeControl.dataNodes)
      this.nodeIDMap.set(node.treeNode.nodeID, node);

    this.treeControl.expand(this.treeControl.dataNodes[0]);

    this.totalSelectedNodes = 0;
    for (let node of this.treeControl.dataNodes) {
      if (node.treeNode.nodeSelected) {
        this.selectedNodes.add(node.treeNode);
        this.totalSelectedNodes++;
      }
    }

    this.selectedCountEvent.emit(this.totalSelectedNodes);
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
  /** Provide padding to tree node based on their level */
  providePaddingForNode(node: FlatTreeNode): object {
    return {
      "margin-left": node.level * 5 + "%",
      "border-left": "1px solid black"
    };
  }

  //==========================================================================
  /** Toggles the expand/collapse state of an expandable tree node */
  toggleNode(node: FlatTreeNode): void {
    node.treeNode.nodeChildrenLoading = true;

    setTimeout(() => {
      if (this.treeControl.isExpanded(node)) this.treeControl.collapse(node);
      else this.treeControl.expand(node);
      node.treeNode.nodeChildrenLoading = false;
    });
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
    for (let node of this.treeControl.dataNodes) {
      node.treeNode.nodeDescendantSelected = false;

      if (selectedNodes.has(node.treeNode)) {
        node.treeNode.nodeDescendantSelected = true;

        let newNode = node;
        while (newNode.treeNode.nodeParentID !== "NULL") {
          newNode = this.nodeIDMap.get(newNode.treeNode.nodeParentID);
          if (newNode.treeNode.nodeDescendantSelected) break;
          newNode.treeNode.nodeDescendantSelected = true;
        }
      }
    }
  }

  //==========================================================================
  /** Selects all descendants and expands the first level childern of a given node.*/
  selectAndExpand(node: FlatTreeNode) {
    node.treeNode.nodeChildrenLoading = true;

    setTimeout(() => {
      let stack = new Stack();
      stack.pushStack(node.treeNode);

      node.treeNode.nodeSelected = !node.treeNode.nodeSelected;
      this.treeControl.expand(node);

      if (this.nodesFoundOnSearch) {
        let descendants = this.treeControl.getDescendants(node);
        for (let descendant of descendants)
          descendant.treeNode.nodeSearchBreanch = true;
      }

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

      node.treeNode.nodeChildrenLoading = false;
      this.displaySelectionNotification(node);
      this.selectedCountEvent.emit(this.totalSelectedNodes);
    });
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
    if (searchTerm.length > 1) this.searchingNodes = true;

    setTimeout(() => {
      if (searchTerm === "") {
        for (let node of this.treeControl.dataNodes)
          node.treeNode.nodeSearchBreanch = true;

        this.treeControl.collapseAll();
        this.treeControl.expand(this.treeControl.dataNodes[0]);
        this.nodesFoundOnSearch = true;
        return;
      }

      if (searchTerm.length > 1) {
        let m = new Date().getTime();
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

        let n = new Date().getTime();
        console.log("filtering = " + (n - m));

        let s = new Date().getTime();

        if (matchedNames.size > 0) {
          this.nodesFoundOnSearch = true;
          this.buildTreeForSearchedNode(matchedNames);
        } else this.nodesFoundOnSearch = false;

        this.searchingNodes = false;

        let e = new Date().getTime();
        console.log("searching = " + (e - s));
      }
    }, 500);
  }

  //==========================================================================
  /** Build the tree when nodes are searched */
  private buildTreeForSearchedNode(matchedNames: Set<string>): void {
    for (let node of this.treeControl.dataNodes) {
      node.treeNode.nodeSearchBreanch = false;
      if (matchedNames.has(node.treeNode.nodeName)) {
        node.treeNode.nodeSearchBreanch = true;

        let newNode = node;
        while (newNode.treeNode.nodeParentID !== "NULL") {
          newNode = this.nodeIDMap.get(newNode.treeNode.nodeParentID);
          if (newNode.treeNode.nodeSearchBreanch) break;
          newNode.treeNode.nodeSearchBreanch = true;
        }
      }
    }

    this.treeControl.expandAll();
  }
}
