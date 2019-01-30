import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  root: ITreeNode[] = [
    {
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
                      nodeChildren: []
                    }
                  ]
                }
              ]
            },
            {
              nodeName: "right_LeftChild",
              nodeID: 4,
              nodeChildren: []
            }
          ]
        },
        {
          nodeName: "rightChild",
          nodeID: 2,
          nodeChildren: [
            {
              nodeName: "test left",
              nodeID: 7,
              nodeChildren: []
            },
            {
              nodeName: "test right",
              nodeID: 8,
              nodeChildren: [
                {
                  nodeName: "test right child",
                  nodeID: 9,
                  nodeChildren: []
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  getRoot(): ITreeNode[] {
    return this.root;
  }
}
