import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  root: ITreeNode = {
    nodeName: "Root",
    nodeID: 0,
    nodeChildren: [
      {
        nodeName: "leftChild",
        nodeID: 1,
        nodeChildren: [
          {
            nodeName: "leftChild_LeftChild",
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
            nodeName: "rightChild_LeftChild",
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
        nodeChildren: [],
        nodeSelected: false,
        nodeVisited: false
      }
    ],
    nodeSelected: false,
    nodeVisited: false
  };

  //  public tree: ITreeNode[] = [this.root, this.leftChild, this.rightChild];

  getTree(): ITreeNode {
    return this.root;
  }
}
