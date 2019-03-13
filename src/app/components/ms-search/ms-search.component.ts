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
  @Input() tabIndex: number;

  constructor(public treeInit: GetTreeService) {
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

  //===========================================================================================
  //  Initializes the search list for the auto-complete feature when searching on the "Show All" Tab
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

  //===========================================================================================
  //  Emit the search term for the "highlight on search" feature on the "Shoe All" Tab
  highlight($searchEvent: string): void {
    if ($searchEvent.length > 1) this.searchTerm.emit($searchEvent);
    else {
      $searchEvent = null;
      this.searchTerm.emit($searchEvent);
    }
  }

  //===========================================================================================
  //  Emit an empty search term event to return to the top of the tree on "Show All" Tab
  backToTopTree($searchEvent: string): void {
    //if (this.tabIndex === 0) $searchEvent === null;
    if ($searchEvent.length === 0) this.searchTerm.emit($searchEvent);
  }
}
