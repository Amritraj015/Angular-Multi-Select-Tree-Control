import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  // raj: ITreeNode = {
  //   nodeName: "raj",
  //   nodeID: 6,
  //   nodeChildren: [],
  //   nodeSelected: false,
  //   nodeVisited: false
  // };

  // amrit: ITreeNode = {
  //   nodeName: "amrit",
  //   nodeID: 5,
  //   nodeChildren: [this.raj],
  //   nodeSelected: false,
  //   nodeVisited: false
  // };

  // left_leftChild: ITreeNode = {
  //   nodeName: "left_LeftChild",
  //   nodeID: 3,
  //   nodeChildren: [this.amrit],
  //   nodeSelected: false,
  //   nodeVisited: false
  // };

  // right_rightChild: ITreeNode = {
  //   nodeName: "right_LeftChild",
  //   nodeID: 4,
  //   nodeChildren: [],
  //   nodeSelected: false,
  //   nodeVisited: false
  // };

  // leftChild: ITreeNode = {
  //   nodeName: "leftChild",
  //   nodeID: 1,
  //   nodeChildren: [this.left_leftChild, this.right_rightChild],
  //   nodeSelected: false,
  //   nodeVisited: false
  // };

  // rightChild: ITreeNode = {
  //   nodeName: "rightChild",
  //   nodeID: 2,
  //   nodeChildren: [],
  //   nodeSelected: false,
  //   nodeVisited: false
  // };

  root: ITreeNode = {
    nodeName: "Root",
    nodeID: 0,
    nodeChildren: [
      {
        nodeName: "leftChild",
        nodeID: 1,
        nodeChildren: [
          {
            nodeName: "left_LeftChild",
            nodeID: 3,
            nodeChildren: [
              {
                nodeName: "amrit",
                nodeID: 5,
                nodeChildren: [
                  {
                    nodeName: "raj",
                    nodeID: 6,
                    nodeChildren: [],
                    nodeSelected: false,
                    nodeVisited: false
                  }
                ],
                nodeSelected: false,
                nodeVisited: false
              }
            ],
            nodeSelected: false,
            nodeVisited: false
          },
          {
            nodeName: "right_LeftChild",
            nodeID: 4,
            nodeChildren: [],
            nodeSelected: false,
            nodeVisited: false
          }
        ],
        nodeSelected: false,
        nodeVisited: false
      },
      {
        nodeName: "rightChild",
        nodeID: 2,
        nodeChildren: [
          {
            nodeName: "test left",
            nodeID: 7,
            nodeChildren: [],
            nodeSelected: false,
            nodeVisited: false
          },
          {
            nodeName: "test right",
            nodeID: 8,
            nodeChildren: [
              {
                nodeName: "test right child",
                nodeID: 9,
                nodeChildren: [],
                nodeSelected: false,
                nodeVisited: false
              }
            ],
            nodeSelected: false,
            nodeVisited: false
          }
        ],
        nodeSelected: false,
        nodeVisited: false
      }
    ],
    nodeSelected: false,
    nodeVisited: false
  };

  // public tree: ITreeNode[] = [
  //   this.root,
  //   this.leftChild,
  //   this.rightChild,
  //   this.left_leftChild,
  //   this.right_rightChild,
  //   this.amrit,
  //   this.raj
  // ];

  getRoot(): ITreeNode {
    return this.root;
  }

  // getTree(): ITreeNode[] {
  //   return this.tree;
  // }
}
