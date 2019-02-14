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
        removedNode = this.denyAccessToNode(removedNode);
        continue;
      }
      for (let newNode of removedNode.nodeChildren) stack.pushStack(newNode);
    }
    return [tree];
  }

  private denyAccessToNode(node: ITreeNode): ITreeNode {
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
