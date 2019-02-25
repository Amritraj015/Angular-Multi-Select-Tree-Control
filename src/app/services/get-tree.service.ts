import { Injectable } from "@angular/core";
import { ITreeNode } from "../Interfaces/ITreeNode";
import { Stack } from "../classes/stackForDepthFirstSearch";
import { MatTreeNestedDataSource } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class GetTreeService {
  dataSource = new MatTreeNestedDataSource<ITreeNode>();

  tree: ITreeNode[] = [
    {
      nodeName: "USA",
      nodeID: 0,
      nodeSelected: false,
      nodeVisited: false,
      nodeAuthorized: true,
      nodeInactive: false,
      nodeChildren: [
        {
          nodeName: "Georgia",
          nodeID: 1,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: [
            {
              nodeName: "Atlanta",
              nodeID: 3,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeInactive: false,
              nodeChildren: [
                {
                  nodeName: "Midtown",
                  nodeID: 5,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeInactive: false,
                  nodeChildren: [
                    {
                      nodeName: "TalentQuest",
                      nodeID: 6,
                      nodeSelected: false,
                      nodeVisited: false,
                      nodeAuthorized: true,
                      nodeInactive: false,
                      nodeChildren: [
                        {
                          nodeName: "TQ Software Development",
                          nodeID: 42,
                          nodeSelected: false,
                          nodeVisited: false,
                          nodeAuthorized: true,
                          nodeInactive: false,
                          nodeChildren: [
                            {
                              nodeName: "Cheif Technology Officer",
                              nodeID: 43,
                              nodeSelected: false,
                              nodeVisited: false,
                              nodeAuthorized: true,
                              nodeInactive: false,
                              nodeChildren: [
                                {
                                  nodeName: "SD Director",
                                  nodeID: 44,
                                  nodeSelected: false,
                                  nodeVisited: false,
                                  nodeAuthorized: true,
                                  nodeInactive: false,
                                  nodeChildren: [
                                    {
                                      nodeName: "Team Lead 1",
                                      nodeID: 45,
                                      nodeSelected: false,
                                      nodeVisited: false,
                                      nodeAuthorized: true,
                                      nodeInactive: false,
                                      nodeChildren: [
                                        {
                                          nodeName: "Developer Team 1",
                                          nodeID: 47,
                                          nodeSelected: false,
                                          nodeVisited: false,
                                          nodeAuthorized: true,
                                          nodeInactive: false,
                                          nodeChildren: []
                                        },
                                        {
                                          nodeName: "Quality Assurance Team 1",
                                          nodeID: 49,
                                          nodeSelected: false,
                                          nodeVisited: false,
                                          nodeAuthorized: true,
                                          nodeInactive: false,
                                          nodeChildren: []
                                        }
                                      ]
                                    },
                                    {
                                      nodeName: "Team Lead 2",
                                      nodeID: 46,
                                      nodeSelected: false,
                                      nodeVisited: false,
                                      nodeAuthorized: true,
                                      nodeInactive: false,
                                      nodeChildren: [
                                        {
                                          nodeName: "Developer Team 2",
                                          nodeID: 48,
                                          nodeSelected: false,
                                          nodeVisited: false,
                                          nodeAuthorized: true,
                                          nodeInactive: false,
                                          nodeChildren: []
                                        },
                                        {
                                          nodeName: "Quality Assurance Team 2",
                                          nodeID: 50,
                                          nodeSelected: false,
                                          nodeVisited: false,
                                          nodeAuthorized: true,
                                          nodeInactive: false,
                                          nodeChildren: []
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          nodeName: "Client Success",
                          nodeID: 51,
                          nodeSelected: false,
                          nodeVisited: false,
                          nodeAuthorized: true,
                          nodeInactive: false,
                          nodeChildren: [
                            {
                              nodeName: "Client Success Manager 1",
                              nodeID: 52,
                              nodeSelected: false,
                              nodeVisited: false,
                              nodeAuthorized: true,
                              nodeInactive: false,
                              nodeChildren: [
                                {
                                  nodeName: "Client Success Specialist",
                                  nodeID: 54,
                                  nodeSelected: false,
                                  nodeVisited: false,
                                  nodeAuthorized: true,
                                  nodeInactive: false,
                                  nodeChildren: []
                                }
                              ]
                            },
                            {
                              nodeName: "Client Success Manager 2",
                              nodeID: 53,
                              nodeSelected: false,
                              nodeVisited: false,
                              nodeAuthorized: true,
                              nodeInactive: false,
                              nodeChildren: []
                            }
                          ]
                        }
                      ]
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
              nodeInactive: false,
              nodeChildren: [
                {
                  nodeName: "KSU",
                  nodeID: 10,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeInactive: false,
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
          nodeInactive: false,
          nodeChildren: [
            {
              nodeName: "NYC",
              nodeID: 7,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: false,
              nodeInactive: false,
              nodeChildren: []
            },
            {
              nodeName: "Manhattan",
              nodeID: 8,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeInactive: false,
              nodeChildren: [
                {
                  nodeName: "Downtown",
                  nodeID: 9,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeInactive: false,
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
          nodeInactive: false,
          nodeChildren: [
            {
              nodeName: "Los Angeles",
              nodeID: 12,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeInactive: false,
              nodeChildren: [
                {
                  nodeName: "Google Office",
                  nodeID: 14,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeInactive: false,
                  nodeChildren: []
                },
                {
                  nodeName: "Microsoft L.A. Office",
                  nodeID: 16,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeInactive: false,
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
              nodeInactive: false,
              nodeChildren: []
            },
            {
              nodeName: "San Diego",
              nodeID: 15,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeInactive: false,
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
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "South Carolina",
          nodeID: 18,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "North Dakota",
          nodeID: 19,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "South Dakota",
          nodeID: 20,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Florida",
          nodeID: 21,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: [
            {
              nodeName: "Florida State University",
              nodeID: 55,
              nodeSelected: false,
              nodeVisited: false,
              nodeAuthorized: true,
              nodeInactive: true,
              nodeChildren: [
                {
                  nodeName: "College of Computing",
                  nodeID: 56,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeInactive: false,
                  nodeChildren: [
                    {
                      nodeName: "BS in Computer Science",
                      nodeID: 57,
                      nodeSelected: false,
                      nodeVisited: false,
                      nodeAuthorized: true,
                      nodeInactive: false,
                      nodeChildren: []
                    }
                  ]
                },
                {
                  nodeName: "College of Arts",
                  nodeID: 58,
                  nodeSelected: false,
                  nodeVisited: false,
                  nodeAuthorized: true,
                  nodeInactive: false,
                  nodeChildren: []
                }
              ]
            }
          ]
        },
        {
          nodeName: "Washingtopn",
          nodeID: 22,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Alabama",
          nodeID: 23,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Alaska",
          nodeID: 24,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Montana",
          nodeID: 25,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "New Jersey",
          nodeID: 26,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Ohio",
          nodeID: 27,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Pennsylvania",
          nodeID: 28,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Rhode Island",
          nodeID: 29,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Wyoming",
          nodeID: 30,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Wisconsin",
          nodeID: 31,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Virginia",
          nodeID: 32,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Tennessee",
          nodeID: 33,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Texas",
          nodeID: 34,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Oklahoma",
          nodeID: 35,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "New Mexico",
          nodeID: 36,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Nevada",
          nodeID: 37,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Massachusetts",
          nodeID: 38,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: false,
          nodeInactive: false,
          nodeChildren: []
        },
        {
          nodeName: "Maine",
          nodeID: 39,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Louisiana",
          nodeID: 40,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: []
        },
        {
          nodeName: "Iowa",
          nodeID: 41,
          nodeSelected: false,
          nodeVisited: false,
          nodeAuthorized: true,
          nodeInactive: true,
          nodeChildren: []
        }
      ]
    }
  ];

  constructor() {
    this.tree = this.fixUnauthorizedNodeHierarchy(this.tree[0]);
    this.dataSource.data = this.getTree();
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
