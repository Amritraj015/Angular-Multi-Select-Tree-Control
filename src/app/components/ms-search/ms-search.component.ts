import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";
import { GetTreeService } from "src/app/services/get-tree.service";

@Component({
  selector: "ms-search",
  templateUrl: "./ms-search.component.html",
  styleUrls: ["./ms-search.component.less"]
})
export class MsSearchComponent implements OnInit {
  searchBoxList: string[] = [];
  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;
  @Output() searchTerm = new EventEmitter<string>();

  constructor(treeInit: GetTreeService) {
    this.searchBoxList = this.searchTreeWithDepthFirstSearch(
      treeInit.dataSource.data[0]
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

  //  Initializes the search list for the auto-complete feature when searching
  private searchTreeWithDepthFirstSearch = (node: ITreeNode) => {
    let stack = new Stack();
    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      if (removedNode.nodeAuthorized)
        this.searchBoxList.push(removedNode.nodeName);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    return this.searchBoxList;
  };

  highlight($searchEvent: string): void {
    this.searchTerm.emit($searchEvent);
  }
}
