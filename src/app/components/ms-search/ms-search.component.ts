import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { MSTreeComponent } from "../ms-tree/ms-tree.component";
import { GetTreeService } from "src/app/services/get-tree.service";

@Component({
  selector: "ms-search",
  templateUrl: "./ms-search.component.html",
  styleUrls: ["./ms-search.component.less"]
})
export class MsSearchComponent implements OnInit {
  treeService = new GetTreeService();
  treeData = new MSTreeComponent(this.treeService);
  dataSource: ITreeNode[] = this.treeData.getTreeData();

  constructor() {
    console.log(this.dataSource);
  }

  ngOnInit(): void {}
}
