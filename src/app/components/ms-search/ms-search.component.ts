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

  constructor() {}

  searchTreeWithDepthFirstSearch = () => {
    let filteredNodeNames: string[];
    let stack = new Stack();
    console.log(this.dataSource);

    stack.pushStack(this.dataSource);
    console.log(stack);

    return filteredNodeNames;
  };

  ngOnInit(): void {}
}

class Stack {
  stack: any[];

  constructor() {
    this.stack = [];
  }

  pushStack(treeNode: any): void {
    this.stack.push(treeNode);
  }

  popStack(): any {
    return this.stack.pop();
  }
}
