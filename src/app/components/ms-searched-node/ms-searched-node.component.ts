import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { MatTreeNestedDataSource } from "@angular/material";
import { NestedTreeControl } from "@angular/cdk/tree";
import { GetTreeService } from "src/app/services/get-tree.service";

@Component({
  selector: "ms-searched-node",
  templateUrl: "./ms-searched-node.component.html",
  styleUrls: ["./ms-searched-node.component.less"]
})
export class MsSearchedNodeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  dataSource: MatTreeNestedDataSource<ITreeNode>;
  @Output() selectedCount = new EventEmitter<ITreeNode>();

  //  call service to get the tree
  constructor(public treeInit: GetTreeService) {
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
}
