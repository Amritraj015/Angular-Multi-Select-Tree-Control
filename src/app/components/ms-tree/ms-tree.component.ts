import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { GetTreeService } from "src/app/services/get-tree.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "ms-tree",
  templateUrl: "./ms-tree.component.html",
  styleUrls: ["./ms-tree.component.less"]
})
export class MSTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode>(node => node.nodeChildren);
  dataSource = new MatTreeNestedDataSource<ITreeNode>();
  @Output() selectedCount = new EventEmitter<ITreeNode>();
  searchBoxList: string[] = [];
  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(treeService: GetTreeService) {
    this.dataSource.data = treeService.getTree();
    this.searchBoxList = this.searchTreeWithDepthFirstSearch(
      this.dataSource.data[0]
    );
  }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    //  Automatically expand the first level children when the fly-out loads
    this.treeControl.expand(this.dataSource.data[0]);
  }

  hasChild = (_: number, node: ITreeNode) =>
    !!node.nodeChildren && node.nodeChildren.length > 0;

  checkChildren = (node: ITreeNode) => node.nodeChildren.length === 0;

  selectAndExpand(node: ITreeNode): void {
    let stack = new Stack();

    //  Toggle the checkbox for the current node
    node.nodeSelected = !node.nodeSelected;

    //  Toggle the checkbox for a node's children
    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      if (removedNode.nodeAuthorized)
        removedNode.nodeSelected = node.nodeSelected;

      //  Expand all the childre4n of a given node when 'selected'
      if (removedNode.nodeSelected) this.treeControl.expand(removedNode);

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    this.selectedCount.emit(this.dataSource.data[0]);
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

    return this.searchBoxList.sort();
  };
}
