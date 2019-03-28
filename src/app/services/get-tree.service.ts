import { Injectable } from "@angular/core";
import { TreeMap } from "../classes/treeMap";
import { FlatTreeControl } from "@angular/cdk/tree";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { map } from "rxjs/operators";
import { FlatTreeNode } from "../classes/flatTreeNode";
import { MatTreeNestedDataSource } from "@angular/material";
import { ITreeNode } from "../Interfaces/ITreeNode";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  dataSource = new MatTreeNestedDataSource<ITreeNode>();

  // constructor() {
  //   let database = new TreeMap();
  //   this.dataSource.data = database.nestedTree;
  // }

  //================================================================================
  //  FLAT TREE NODES

  dataChange = new BehaviorSubject<FlatTreeNode[]>([]);

  constructor(
    private treeControl: FlatTreeControl<FlatTreeNode>,
    public database: TreeMap
  ) {}

  get data(): FlatTreeNode[] {
    return this.dataChange.value;
  }
  set data(value: FlatTreeNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<FlatTreeNode[]> {
    this.treeControl.expansionModel.onChange.subscribe(change => {
      if (
        (change as SelectionChange<FlatTreeNode>).added ||
        (change as SelectionChange<FlatTreeNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<FlatTreeNode>);
      }
    });

    console.log(collectionViewer.viewChange);

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<FlatTreeNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /** Toggle the node, remove from display list */
  toggleNode(node: FlatTreeNode, expand: boolean) {
    const children = this.database.getChildren(node.node);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          nodeID =>
            new FlatTreeNode(
              nodeID,
              node.level + 1,
              this.database.isExpandable(nodeID)
            )
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
  }
  //================================================================================
}
