import { Component, OnInit } from '@angular/core';
import { ITreeNode } from '../TreeNodeInterface/ITreeNode';

@Component({
  selector: 'ms-tree',
  templateUrl: './ms-tree.component.html',
  styleUrls: ['./ms-tree.component.less']
})
export class MSTreeComponent implements OnInit {

  leftChild: ITreeNode = {
    'nodeName': 'leftChild',
    'nodeID': 1,
    'nodeParent': null,
    'nodeChildren': null
  };

  rightChild: ITreeNode = {
    'nodeName': 'rightChild',
    'nodeID': 2,
    'nodeParent': null,
    'nodeChildren': null
  };

  root: ITreeNode = {
    'nodeName': 'Root',
    'nodeID': 0,
    'nodeParent': null,
    'nodeChildren': [this.leftChild, this.rightChild]
  };

  public tree: ITreeNode[] = [this.root, this.leftChild, this.rightChild];

  ngOnInit() {
  }

}
