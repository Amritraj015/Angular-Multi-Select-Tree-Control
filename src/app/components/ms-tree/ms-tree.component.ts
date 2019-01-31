import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { GetTreeService } from "src/app/services/get-tree.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  dataSource = new MatTreeNestedDataSource<ITreeNode>();

  constructor(treeService: GetTreeService) {
    this.dataSource.data = treeService.getTree();
  }

  hasChild = (_: number, node: ITreeNode) =>
    !!node.nodeChildren && node.nodeChildren.length > 0;

  isNodeSelected(node): void {
    node.nodeSelected = !node.nodeSelected;
    console.log(node.nodeName);
    console.log(node.nodeSelected);
  }

  getTreeData(): ITreeNode[] {
    return this.dataSource.data;
  }

  ngOnInit() {}
}
