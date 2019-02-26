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
  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;
  @Output() searchTerm = new EventEmitter<string>();
  @Input() showSleectedTab: boolean;

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

  //  Initializes the search list for the auto-complete feature when searching on teh Show All Tab
  InitAllAutoCompleteList(
    tree: ITreeNode = this.treeInit.dataSource.data[0],
    showSleectedTab: boolean = false
  ): string[] {
    if (!showSleectedTab) {
      let stack = new Stack();
      stack.pushStack(tree);

      while (stack.stack.length > 0) {
        let removedNode: ITreeNode = stack.popStack();

        if (removedNode.nodeAuthorized)
          this.searchBoxList.push(removedNode.nodeName);

        for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
      }
    } else {
      this.searchBoxList = this.InitSelectedAutoComplete(tree);
    }

    return this.searchBoxList;
  }

  //  Initializes the search list for the auto-complete feature when searching on teh Show Selected Tab
  private InitSelectedAutoComplete(
    tree: ITreeNode = this.treeInit.dataSource.data[0]
  ): string[] {
    this.searchBoxList = [];

    let stack = new Stack();
    stack.pushStack(tree);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      if (removedNode.nodeAuthorized && removedNode.nodeSelected)
        this.searchBoxList.push(removedNode.nodeName);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    return this.searchBoxList;
  }

  highlight($searchEvent: string): void {
    if ($searchEvent.length > 1) this.searchTerm.emit($searchEvent);
    else {
      $searchEvent = null;
      this.searchTerm.emit($searchEvent);
    }
  }
}
