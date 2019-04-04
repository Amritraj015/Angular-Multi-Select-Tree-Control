import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
  ContentChildren
} from "@angular/core";
import { GetTreeService } from "src/app/services/get-tree.service";
import { FlatTreeNode } from "src/app/classes/FlatTreeNode";
import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { Stack } from "src/app/classes/Stack";
import { TreeNode } from "src/app/classes/TreeNode";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

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
  currentTabIndex: number;
  @ViewChild("tree") tree: ElementRef;

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

  constructor(public treeService: GetTreeService) {
    this.totalSelectedNodes = 0;

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
  }

  ngOnInit(): void {
    for (let i = 100, j = 500; i < 400 && j < 800; i++, j++) {
      // this.treeControl.dataNodes[i].treeNode.nodeSearchBreanch = true;
      this.treeControl.dataNodes[i].treeNode.nodeInactive = true;
      this.treeControl.dataNodes[j].treeNode.nodeAuthorized = false;
    }

    // this.fullDataSource[0] = this.treeControl.dataNodes[0].treeNode;

    this.treeControl.expand(this.treeControl.dataNodes[0]);
  }

  ngAfterViewInit() {
    console.log(this.tree);
    // console.log(this.fullDataSource);
    // this.virtualScroll.renderedRangeStream.subscribe(range => {
    //   console.log(range, "range");
    //   this.dataSource.data = this.fullDataSource.slice(range.start, range.end);
    // });
  }

  hasChild = (_: number, node: FlatTreeNode) => node.expandable;

  checkNodeSelection(): boolean {
    return this.totalSelectedNodes > 0;
  }

  checkChildren = (node: FlatTreeNode) => !node.expandable;

  storeTabIndex($event: number): void {
    this.currentTabIndex = $event;
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
        if (!removedNode.nodeSelected && removedNode.nodeAuthorized)
          this.totalSelectedNodes++;

      if (!node.treeNode.nodeSelected)
        if (removedNode.nodeSelected && removedNode.nodeAuthorized)
          this.totalSelectedNodes--;

      removedNode.nodeSelected = node.treeNode.nodeSelected;
      for (let child of removedNode.nodeChildren) stack.pushStack(child);
    }

    this.selectedCountEvent.emit(this.totalSelectedNodes);
  }

  findMatchingTreeNodes(searchTerm: string): void {
    if (searchTerm === null || searchTerm === "") {
      this.treeControl.collapseAll();
      this.treeControl.expand(this.treeControl.dataNodes[0]);
      return;
    }

    if (searchTerm.length > 1) {
      let matchedNames: string[] = [];
      let pattern = searchTerm
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        .split(" ")
        .filter(splitTerm => {
          return splitTerm.length > 1;
        })
        .join("|");
      let regExp = new RegExp(pattern, "gi");

      for (let node of this.treeControl.dataNodes) {
        if (regExp.test(node.treeNode.nodeName)) {
          matchedNames.push(
            node.treeNode.nodeName.replace(
              regExp,
              matchedString => matchedString
            )
          );
        }
      }

      this.buildNewDataSource(matchedNames);
    }
  }

  private buildNewDataSource(matchedNames: string[]): void {
    // let stack = new Stack();
    // stack.pushStack(this.treeControl.dataNodes[0].treeNode);
    // for (let node of this.treeControl.dataNodes) {
    //   stack.popStack();
    //   for (let newNode of this.treeControl.dataNodes) {
    //     if (newNode.treeNode.nodeParentID === node.treeNode.nodeID) {
    //       node.treeNode.nodeChildren.push(newNode.treeNode);
    //       stack.pushStack(newNode.treeNode);
    //     }
    //   }
    // }
  }
}
