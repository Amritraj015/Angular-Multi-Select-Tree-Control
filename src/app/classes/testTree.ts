import { ITreeNode } from "../Interfaces/ITreeNode";

export class TestTree {
  tree: ITreeNode[];

  constructor() {
    this.tree = [
      {
        nodeName: "USA",
        nodeID: 0,
        nodeParentID: NaN,
        nodeSelected: false,
        nodeDescendantSelected: false,
        nodeAuthorized: true,
        nodeInactive: false,
        nodeChildren: [
          {
            nodeName: "Georgia",
            nodeID: 1,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: [
              {
                nodeName: "Atlanta",
                nodeID: 3,
                nodeParentID: 1,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: true,
                nodeInactive: false,
                nodeChildren: [
                  {
                    nodeName: "Midtown",
                    nodeID: 5,
                    nodeParentID: 3,
                    nodeSelected: false,
                    nodeDescendantSelected: false,
                    nodeAuthorized: true,
                    nodeInactive: false,
                    nodeChildren: [
                      {
                        nodeName: "TalentQuest",
                        nodeID: 6,
                        nodeParentID: 5,
                        nodeSelected: false,
                        nodeDescendantSelected: false,
                        nodeAuthorized: true,
                        nodeInactive: false,
                        nodeChildren: [
                          {
                            nodeName: "TQ Software Development",
                            nodeID: 42,
                            nodeParentID: 6,
                            nodeSelected: false,
                            nodeDescendantSelected: false,
                            nodeAuthorized: true,
                            nodeInactive: false,
                            nodeChildren: [
                              {
                                nodeName: "Cheif Technology Officer",
                                nodeID: 43,
                                nodeParentID: 42,
                                nodeSelected: false,
                                nodeDescendantSelected: false,
                                nodeAuthorized: true,
                                nodeInactive: false,
                                nodeChildren: [
                                  {
                                    nodeName: "SD Director",
                                    nodeID: 44,
                                    nodeParentID: 43,
                                    nodeSelected: false,
                                    nodeDescendantSelected: false,
                                    nodeAuthorized: true,
                                    nodeInactive: false,
                                    nodeChildren: [
                                      {
                                        nodeName: "Team Lead 1",
                                        nodeID: 45,
                                        nodeParentID: 44,
                                        nodeSelected: false,
                                        nodeDescendantSelected: false,
                                        nodeAuthorized: true,
                                        nodeInactive: false,
                                        nodeChildren: [
                                          {
                                            nodeName: "Developer Team 1",
                                            nodeID: 47,
                                            nodeParentID: 45,
                                            nodeSelected: false,
                                            nodeDescendantSelected: false,
                                            nodeAuthorized: true,
                                            nodeInactive: false,
                                            nodeChildren: []
                                          },
                                          {
                                            nodeName:
                                              "Quality Assurance Team 1",
                                            nodeID: 49,
                                            nodeParentID: 45,
                                            nodeSelected: false,
                                            nodeDescendantSelected: false,
                                            nodeAuthorized: true,
                                            nodeInactive: false,
                                            nodeChildren: []
                                          }
                                        ]
                                      },
                                      {
                                        nodeName: "Team Lead 2",
                                        nodeID: 46,
                                        nodeParentID: 44,
                                        nodeSelected: false,
                                        nodeDescendantSelected: false,
                                        nodeAuthorized: true,
                                        nodeInactive: false,
                                        nodeChildren: [
                                          {
                                            nodeName: "Developer Team 2",
                                            nodeID: 48,
                                            nodeParentID: 46,
                                            nodeSelected: false,
                                            nodeDescendantSelected: false,
                                            nodeAuthorized: true,
                                            nodeInactive: false,
                                            nodeChildren: []
                                          },
                                          {
                                            nodeName:
                                              "Quality Assurance Team 2",
                                            nodeID: 50,
                                            nodeParentID: 46,
                                            nodeSelected: false,
                                            nodeDescendantSelected: false,
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
                            nodeParentID: 6,
                            nodeSelected: false,
                            nodeDescendantSelected: false,
                            nodeAuthorized: true,
                            nodeInactive: false,
                            nodeChildren: [
                              {
                                nodeName: "Client Success Manager 1",
                                nodeID: 52,
                                nodeParentID: 51,
                                nodeSelected: false,
                                nodeDescendantSelected: false,
                                nodeAuthorized: true,
                                nodeInactive: false,
                                nodeChildren: [
                                  {
                                    nodeName: "Client Success Specialist",
                                    nodeID: 54,
                                    nodeParentID: 52,
                                    nodeSelected: false,
                                    nodeDescendantSelected: false,
                                    nodeAuthorized: true,
                                    nodeInactive: false,
                                    nodeChildren: []
                                  }
                                ]
                              },
                              {
                                nodeName: "Client Success Manager 2",
                                nodeID: 53,
                                nodeParentID: 51,
                                nodeSelected: false,
                                nodeDescendantSelected: false,
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
                nodeParentID: 1,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: false,
                nodeInactive: false,
                nodeChildren: [
                  {
                    nodeName: "KSU",
                    nodeID: 10,
                    nodeParentID: 4,
                    nodeSelected: false,
                    nodeDescendantSelected: false,
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
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: [
              {
                nodeName: "NYC",
                nodeID: 7,
                nodeParentID: 2,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: false,
                nodeInactive: false,
                nodeChildren: []
              },
              {
                nodeName: "Manhattan",
                nodeID: 8,
                nodeParentID: 2,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: true,
                nodeInactive: false,
                nodeChildren: [
                  {
                    nodeName: "Downtown",
                    nodeID: 9,
                    nodeParentID: 8,
                    nodeSelected: false,
                    nodeDescendantSelected: false,
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
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: [
              {
                nodeName: "Los Angeles",
                nodeID: 12,
                nodeParentID: 11,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: true,
                nodeInactive: false,
                nodeChildren: [
                  {
                    nodeName: "Google Office",
                    nodeID: 14,
                    nodeParentID: 12,
                    nodeSelected: false,
                    nodeDescendantSelected: false,
                    nodeAuthorized: true,
                    nodeInactive: false,
                    nodeChildren: []
                  },
                  {
                    nodeName: "Microsoft L.A. Office",
                    nodeID: 16,
                    nodeParentID: 12,
                    nodeSelected: false,
                    nodeDescendantSelected: false,
                    nodeAuthorized: true,
                    nodeInactive: false,
                    nodeChildren: []
                  }
                ]
              },
              {
                nodeName: "San Fransisco",
                nodeID: 13,
                nodeParentID: 11,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: true,
                nodeInactive: false,
                nodeChildren: []
              },
              {
                nodeName: "San Diego",
                nodeID: 15,
                nodeParentID: 11,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: true,
                nodeInactive: false,
                nodeChildren: []
              }
            ]
          },
          {
            nodeName: "North Carolina",
            nodeID: 17,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "South Carolina",
            nodeID: 18,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "North Dakota",
            nodeID: 19,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "South Dakota",
            nodeID: 20,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Florida",
            nodeID: 21,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: [
              {
                nodeName: "Florida State University",
                nodeID: 55,
                nodeParentID: 21,
                nodeSelected: false,
                nodeDescendantSelected: false,
                nodeAuthorized: true,
                nodeInactive: true,
                nodeChildren: [
                  {
                    nodeName: "College of Computing",
                    nodeID: 56,
                    nodeParentID: 55,
                    nodeSelected: false,
                    nodeDescendantSelected: false,
                    nodeAuthorized: true,
                    nodeInactive: false,
                    nodeChildren: [
                      {
                        nodeName: "BS in Computer Science",
                        nodeID: 57,
                        nodeParentID: 56,
                        nodeSelected: false,
                        nodeDescendantSelected: false,
                        nodeAuthorized: true,
                        nodeInactive: false,
                        nodeChildren: []
                      }
                    ]
                  },
                  {
                    nodeName: "College of Arts",
                    nodeID: 58,
                    nodeParentID: 55,
                    nodeSelected: false,
                    nodeDescendantSelected: false,
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
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Alabama",
            nodeID: 23,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Alaska",
            nodeID: 24,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Montana",
            nodeID: 25,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "New Jersey",
            nodeID: 26,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Ohio",
            nodeID: 27,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Pennsylvania",
            nodeID: 28,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Rhode Island",
            nodeID: 29,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Wyoming",
            nodeID: 30,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Wisconsin",
            nodeID: 31,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Virginia",
            nodeID: 32,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Tennessee",
            nodeID: 33,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Texas",
            nodeID: 34,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Oklahoma",
            nodeID: 35,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "New Mexico",
            nodeID: 36,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Nevada",
            nodeID: 37,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Massachusetts",
            nodeID: 38,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: false,
            nodeInactive: false,
            nodeChildren: []
          },
          {
            nodeName: "Maine",
            nodeID: 39,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Louisiana",
            nodeID: 40,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: []
          },
          {
            nodeName: "Iowa",
            nodeID: 41,
            nodeParentID: 0,
            nodeSelected: false,
            nodeDescendantSelected: false,
            nodeAuthorized: true,
            nodeInactive: true,
            nodeChildren: []
          }
        ]
      }
    ];
  }

  getTreeData(): ITreeNode[] {
    return this.tree;
  }
}
