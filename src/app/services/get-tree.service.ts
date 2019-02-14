import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { Stack } from "../classes/stackForDepthFirstSearch";

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
      nodeAuthorized: true,
      nodeChildren: [
        {
          nodeName: "Georgia",
          nodeID: 1,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: [
            {
              nodeName: "Atlanta",
              nodeID: 3,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeChildren: [
                {
                  nodeName: "Midtown",
                  nodeID: 5,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeChildren: [
                    {
                      nodeName: "TalentQuest",
                      nodeID: 6,
                      nodeSelected: false,
                      nodeVisited: false,
                      nodeAuthorized: true,
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
              nodeAuthorized: false,
              nodeChildren: [
                {
                  nodeName: "KSU",
                  nodeID: 10,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
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
          nodeAuthorized: true,
          nodeChildren: [
            {
              nodeName: "NYC",
              nodeID: 7,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: false,
              nodeChildren: []
            },
            {
              nodeName: "Manhattan",
              nodeID: 8,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeChildren: [
                {
                  nodeName: "Downtown",
                  nodeID: 9,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeChildren: []
                }
              ]
            }
          ]
        },
        {
          nodeName: "California",
          nodeID: 11,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: [
            {
              nodeName: "Los Angeles",
              nodeID: 12,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeChildren: [
                {
                  nodeName: "Google Office",
                  nodeID: 14,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeChildren: []
                },
                {
                  nodeName: "Microsoft L.A. Office",
                  nodeID: 16,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeChildren: []
                }
              ]
            },
            {
              nodeName: "San Fransisco",
              nodeID: 13,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeChildren: []
            },
            {
              nodeName: "San Diego",
              nodeID: 15,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeChildren: []
            }
          ]
        },
        {
          nodeName: "North Carolina",
          nodeID: 17,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "South Carolina",
          nodeID: 18,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "North Dakota",
          nodeID: 19,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "South Dakota",
          nodeID: 20,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Florida",
          nodeID: 21,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Washingtopn",
          nodeID: 22,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Alabama",
          nodeID: 23,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Alaska",
          nodeID: 24,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Montana",
          nodeID: 25,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "New Jersey",
          nodeID: 26,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Ohio",
          nodeID: 27,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Pennsylvania",
          nodeID: 28,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Rhode Island",
          nodeID: 29,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Wyoming",
          nodeID: 30,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Wisconsin",
          nodeID: 31,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Virginia",
          nodeID: 32,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Tennessee",
          nodeID: 33,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Texas",
          nodeID: 34,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Oklahoma",
          nodeID: 35,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "New Mexico",
          nodeID: 36,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Nevada",
          nodeID: 37,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Massachusetts",
          nodeID: 38,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeChildren: []
        },
        {
          nodeName: "Maine",
          nodeID: 39,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Louisiana",
          nodeID: 40,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        },
        {
          nodeName: "Iowa",
          nodeID: 41,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeChildren: []
        }
      ]
    }
  ];

  constructor() {
    this.tree = this.fixUnauthorizedNodeHierarchy(this.tree[0]);
  }

  private fixUnauthorizedNodeHierarchy(tree: ITreeNode): ITreeNode[] {
    let stack = new Stack();

    stack.pushStack(tree);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      if (!removedNode.nodeAuthorized) {
        removedNode = this.denyNodeAccessToUser(removedNode);
        continue;
      }
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }
    return [tree];
  }

  private denyNodeAccessToUser(node: ITreeNode): ITreeNode {
    let stack = new Stack();

    stack.pushStack(node);

    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();
      removedNode.nodeAuthorized = false;

      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }

    return node;
  }

  //    This method will make a request to a server
  //    to deliver an array with the tree object.
  //    *** Since, this is a nested tree control, the array must have
  //    one and only one nested tree object ***

  getTree(): ITreeNode[] {
    return this.tree;
  }
}
