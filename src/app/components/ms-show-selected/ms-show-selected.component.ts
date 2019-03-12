import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { GetTreeService } from "src/app/services/get-tree.service";
import { startWith, map } from "rxjs/operators";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";
import { NestedTreeControl } from "@angular/cdk/tree";

@Component({
  selector: "ms-show-selected",
  templateUrl: "./ms-show-selected.component.html",
  styleUrls: ["./ms-show-selected.component.less"]
})
export class MsShowSelectedComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  searchBoxList: string[] = [];
  filteredOptions: Observable<string[]>;
  searchControl = new FormControl();
  @Output() searchTerm = new EventEmitter<string>();

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
    this.treeControl.expand(this.treeInit.dataSource.data[0]);
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
      if (removedNode.nodeAuthorized && removedNode.nodeSelected)
        this.searchBoxList.push(removedNode.nodeName);
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    return this.searchBoxList.sort();
  }

  highlight($searchEvent: string): void {
    if ($searchEvent.length > 1) this.searchTerm.emit($searchEvent);
    else {
      $searchEvent = null;
      this.searchTerm.emit($searchEvent);
    }
  }

  backToTop(): void {
    let stack = new Stack();

    stack.pushStack(this.treeInit.dataSource.data[0]);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      // if (removedNode.nodeAuthorized) {
      //   removedNode.nodeSearchBreanch = true;
      //   console.log(removedNode.nodeSearchBreanch);
      // }
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }
  }
}
