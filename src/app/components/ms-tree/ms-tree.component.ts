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
import { TreeNode } from "src/app/classes/TreeNode";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material";
import { ArrayDataSource } from "@angular/cdk/collections";

@Component({
  selector: "ms-tree",
  templateUrl: "./test.html",
  styleUrls: ["./ms-tree.component.less"],
  providers: [TreeMap]
})
export class MSTreeComponent implements OnInit {
  treeControl: FlatTreeControl<FlatTreeNode>;
  dataSource: ArrayDataSource<ITreeNode>;

  constructor(treeService: GetTreeService) {
    this.treeControl = new FlatTreeControl(
      node => node.level,
      node => node.expandable
    );
  }

  ngOnInit(): void {}
}
// //==============================================================================
// treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);

// constructor(public treeInit: GetTreeService) {}
// ngOnInit(): void {}

// hasChild = (_: number, node: ITreeNode) =>
//   !!node.nodeChildren && node.nodeChildren.length > 0;

// checkChildren = (node: ITreeNode) => node.nodeChildren.length === 0;
// //==============================================================================
