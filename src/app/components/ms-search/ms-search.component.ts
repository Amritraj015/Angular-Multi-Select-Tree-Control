import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { MSTreeComponent } from "../ms-tree/ms-tree.component";
import { GetTreeService } from "src/app/services/get-tree.service";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";

@Component({
  selector: "ms-search",
  templateUrl: "./ms-search.component.html",
  styleUrls: ["./ms-search.component.less"]
})
export class MsSearchComponent implements OnInit {
  treeService = new GetTreeService();
  treeData = new MSTreeComponent(this.treeService);
  dataSource: ITreeNode[] = this.treeData.getTreeData();
  searchBoxList: string[] = [];
  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor() {
    this.searchBoxList = this.searchTreeWithDepthFirstSearch(
      this.dataSource[0]
    );
  }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchBoxList.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  searchTreeWithDepthFirstSearch = (node: ITreeNode) => {
    let stack = new Stack();
    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      this.searchBoxList.push(removedNode.nodeName);
      for (let newNode of removedNode.nodeChildren) {
        stack.pushStack(newNode);
      }
    }

    return this.searchBoxList;
  };
}
