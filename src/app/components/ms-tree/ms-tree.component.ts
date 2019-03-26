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
import { TreeMap } from "src/app/classes/treeMap";
import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";

@Component({
  selector: "ms-tree",
  templateUrl: "./test.html",
  styleUrls: ["./ms-tree.component.less"],
  providers: [TreeMap]
})
export class MSTreeComponent implements OnInit {
  treeControl: FlatTreeControl<FlatTreeNode>;
  dataSource: GetTreeService;
  @ViewChild("tree") tree;

  constructor(treeMapData: TreeMap) {
    this.treeControl = new FlatTreeControl<FlatTreeNode>(
      this.getLevel,
      this.isExpandable
    );

    this.dataSource = new GetTreeService(this.treeControl, treeMapData);
    this.dataSource.data = treeMapData.initialTreeNode();
  }

  ngOnInit(): void {}

  getLevel = (node: FlatTreeNode) => node.level;

  isExpandable = (node: FlatTreeNode) => node.expandable;

  hasChild = (_: number, _nodeData: FlatTreeNode) => _nodeData.expandable;

  selectAndExpand(treeNode: FlatTreeNode): void {
    let stack = new Stack();

    stack.pushStack(treeNode.node);
    treeNode.node.nodeSelected = !treeNode.node.nodeSelected;
    this.treeControl.expand(treeNode);

    while (stack.stack.length !== 0) {
      let removedNode = stack.popStack();
      removedNode.nodeSelected = treeNode.node.nodeSelected;

      if (this.dataSource.database.treeMap.has(removedNode)) {
        for (let child of this.dataSource.database.treeMap.get(removedNode)) {
          stack.pushStack(child);
        }
      }
    }
  }
  //==============================================================================
  //  NESTED TREE
  // treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);

  // constructor(public treeInit: GetTreeService) {}

  // hasChild = (_: number, node: ITreeNode) =>
  //   !!node.nodeChildren && node.nodeChildren.length > 0;

  // checkChildren = (node: ITreeNode) => node.nodeChildren.length === 0;

  // ngOnInit(): void {}
  //==============================================================================
}
