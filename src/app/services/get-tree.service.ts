import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  tree: ITreeNode[] = [
    {
      nodeName: "USA",
      nodeID: 0,
      nodeSelected: false,
      nodeVisited: false,
      nodeChildren: [
        {
          nodeName: "Georgia",
          nodeID: 1,
          nodeSelected: false,
          nodeVisited: false,
          nodeChildren: [
            {
              nodeName: "Atlanta",
              nodeID: 3,
              nodeSelected: false,
              nodeVisited: false,
              nodeChildren: [
                {
                  nodeName: "Midtown",
                  nodeID: 5,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeChildren: [
                    {
                      nodeName: "TalentQuest",
                      nodeID: 6,
                      nodeSelected: false,
                      nodeVisited: false,
                      nodeChildren: []
                    }
                  ]
                }
              ]
            },
            {
              nodeName: "Marietta",
              nodeID: 4,
              nodeSelected: false,
              nodeVisited: false,
              nodeChildren: [
                {
                  nodeName: "KSU",
                  nodeID: 10,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeChildren: []
                }
              ]
            }
          ]
        },
        {
          nodeName: "New York",
          nodeID: 2,
          nodeSelected: false,
          nodeVisited: false,
          nodeChildren: [
            {
              nodeName: "NYC",
              nodeID: 7,
              nodeSelected: false,
              nodeVisited: false,
              nodeChildren: []
            },
            {
              nodeName: "Manhattan",
              nodeID: 8,
              nodeSelected: false,
              nodeVisited: false,
              nodeChildren: [
                {
                  nodeName: "Downtown",
                  nodeID: 9,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeChildren: []
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  getTree(): ITreeNode[] {
    return this.tree;
  }
}
