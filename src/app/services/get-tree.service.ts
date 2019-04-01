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
export class GetTreeService {}
