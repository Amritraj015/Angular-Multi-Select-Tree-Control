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

  ngAfterViewInit() {
    this.dataSource.data[0].isLoading = true;
    console.log(this.dataSource.data[0]);
    console.log(this.dataSource.data[0].isLoading);

    this.tree.treeControl.expand(this.dataSource.data[0]);
    console.log(this.dataSource.data[0]);
  }

  selectAndExpand(node: FlatTreeNode): void {
    let stack = new Stack();

    stack.pushStack(this.dataSource.database.rootLevelNode[0]);
    this.treeControl.expand(node);
    while (stack.stack.length !== 0) {
      let removedNode = stack.popStack();

      if (this.dataSource.database.treeMap.has(removedNode)) {
      }
      //console.log(this.dataSource.data);
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
