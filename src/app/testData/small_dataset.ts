import { ITreeNode } from "../Interfaces/ITreeNode";

export let tree: ITreeNode[] = [
  {
    nodeName: "USA",
    nodeID: "0",
    nodeParentID: "NULL",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Georgia",
    nodeID: "1",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Atlanta",
    nodeID: "3",
    nodeParentID: "1",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Midtown",
    nodeID: "5",
    nodeParentID: "3",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Company 1",
    nodeID: "6",
    nodeParentID: "5",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "TQ Software Development",
    nodeID: "42",
    nodeParentID: "6",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Cheif Technology Officer",
    nodeID: "43",
    nodeParentID: "42",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "SD Director",
    nodeID: "44",
    nodeParentID: "43",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Team Lead 1",
    nodeID: "45",
    nodeParentID: "44",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Developer Team 1",
    nodeID: "47",
    nodeParentID: "45",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Quality Assurance Team 1",
    nodeID: "49",
    nodeParentID: "45",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Team Lead 2",
    nodeID: "46",
    nodeParentID: "44",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Developer Team 2",
    nodeID: "48",
    nodeParentID: "46",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Quality Assurance Team 2",
    nodeID: "50",
    nodeParentID: "46",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Client Success",
    nodeID: "51",
    nodeParentID: "6",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Client Success Manager 1",
    nodeID: "52",
    nodeParentID: "51",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Client Success Specialist",
    nodeID: "54",
    nodeParentID: "52",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Client Success Manager 2",
    nodeID: "53",
    nodeParentID: "51",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Marietta",
    nodeID: "4",
    nodeParentID: "1",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "KSU",
    nodeID: "10",
    nodeParentID: "4",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "New York",
    nodeID: "2",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "NYC",
    nodeID: "7",
    nodeParentID: "2",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "Manhattan",
    nodeID: "8",
    nodeParentID: "2",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Downtown",
    nodeID: "9",
    nodeParentID: "8",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "California",
    nodeID: "11",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Los Angeles",
    nodeID: "12",
    nodeParentID: "11",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Google Office",
    nodeID: "14",
    nodeParentID: "12",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Microsoft L.A. Office",
    nodeID: "16",
    nodeParentID: "12",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "San Fransisco",
    nodeID: "13",
    nodeParentID: "11",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "San Diego",
    nodeID: "15",
    nodeParentID: "11",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "North Carolina",
    nodeID: "17",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "South Carolina",
    nodeID: "18",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "North Dakota",
    nodeID: "19",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "South Dakota",
    nodeID: "20",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: true
  },
  {
    nodeName: "Florida",
    nodeID: "21",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "Florida State University",
    nodeID: "55",
    nodeParentID: "21",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "College of Computing",
    nodeID: "56",
    nodeParentID: "55",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "BS in Computer Science",
    nodeID: "57",
    nodeParentID: "56",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "College of Arts",
    nodeID: "58",
    nodeParentID: "55",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Washingtopn",
    nodeID: "22",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "Alabama",
    nodeID: "23",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Alaska",
    nodeID: "24",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "Montana",
    nodeID: "25",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "New Jersey",
    nodeID: "26",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: true
  },
  {
    nodeName: "Ohio",
    nodeID: "27",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "Pennsylvania",
    nodeID: "28",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "Rhode Island",
    nodeID: "29",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "Wyoming",
    nodeID: "30",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "Wisconsin",
    nodeID: "31",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "Virginia",
    nodeID: "32",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "Tennessee",
    nodeID: "33",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "Texas",
    nodeID: "34",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Oklahoma",
    nodeID: "35",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "New Mexico",
    nodeID: "36",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Nevada",
    nodeID: "37",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: false
  },
  {
    nodeName: "Massachusetts",
    nodeID: "38",
    nodeParentID: "0",
    nodeAuthorized: false,
    nodeInactive: false
  },
  {
    nodeName: "Maine",
    nodeID: "39",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "Louisiana",
    nodeID: "40",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  },
  {
    nodeName: "Iowa",
    nodeID: "41",
    nodeParentID: "0",
    nodeAuthorized: true,
    nodeInactive: true
  }
];
