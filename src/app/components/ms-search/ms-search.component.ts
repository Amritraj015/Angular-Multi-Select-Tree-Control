import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
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
  filteredOptions: Observable<string[]>;
  searchControl = new FormControl();
  @Output() searchTerm = new EventEmitter<string>();
  searchBoxInFocus: boolean;
  @Output() searchFocusEmitter = new EventEmitter<boolean>();

  constructor(public treeInit: GetTreeService) {
    this.searchBoxInFocus = false;
    this.searchBoxList = this.InitAllAutoCompleteList(
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

  //  Initializes the search list for the auto-complete feature when searching on teh Show All Tab
  private InitAllAutoCompleteList(tree: ITreeNode): string[] {
    let stack = new Stack();
    stack.pushStack(tree);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (removedNode.nodeAuthorized)
        this.searchBoxList.push(removedNode.nodeName);
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    return this.searchBoxList.sort();
  }

  searchBoxFocus(): void {
    this.searchBoxInFocus = true;
    this.searchFocusEmitter.emit(this.searchBoxInFocus);
  }

  searchBoxBlur(): void {
    this.searchBoxInFocus = false;
    this.searchFocusEmitter.emit(this.searchBoxInFocus);
  }

  highlight($searchEvent: string): void {
    if ($searchEvent.length > 1) this.searchTerm.emit($searchEvent);
    else {
      $searchEvent = null;
      this.searchTerm.emit($searchEvent);
    }
  }
}
