import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { MatTreeNestedDataSource } from "@angular/material";
import { OrgUnitsDataSet } from "../testData/medium_dataset";
import { TreeMap } from "../classes/treeMap";
import { FlatTreeNode } from "../classes/flatTreeNode";
import { FlatTreeControl } from "@angular/cdk/tree";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  dataSource = new MatTreeNestedDataSource<ITreeNode>();
  private treeControl: FlatTreeControl<ITreeNode>;
  private database: TreeMap;

  constructor() {
    this.dataSource.data = this.getTree();
    let treeMap = new TreeMap();
  }

  //    This method will make a request to a server
  //    to deliver an array with the tree object.
  //    *** Since, this is a nested tree control, the array must have
  //    one and only one nested tree object ***

  getTree(): ITreeNode[] {
    let tree = new OrgUnitsDataSet();
    let allNodes: ITreeNode[] = [];

    for (let org of tree.orgUnits) {
      var newNode: ITreeNode = {
        nodeName: org.companyname,
        nodeID: parseInt(org.companyid),
        nodeParentID: parseInt(org.parentid),
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeAuthorized: true,
        nodeInactive: false,
        nodeSearchBreanch: false,
        nodeChildren: [],
        level: 1,
        expandable: false,
        isLoading: false
      };

      allNodes.push(newNode);
    }

    let newTree: ITreeNode = allNodes[0];
    return [newTree];
  }

  //======================================================================================

  dataChange = new BehaviorSubject<ITreeNode[]>([]);

  get data(): ITreeNode[] {
    return this.dataChange.value;
  }
  set data(value: ITreeNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<ITreeNode[]> {
    this.treeControl.expansionModel.onChange.subscribe(change => {
      if (
        (change as SelectionChange<ITreeNode>).added ||
        (change as SelectionChange<ITreeNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<ITreeNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<ITreeNode>) {
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

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: ITreeNode, expand: boolean) {
    const children = this.database.getChildren(node.nodeID);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name => new ITreeNode());
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
    }, 1000);
  }
}
