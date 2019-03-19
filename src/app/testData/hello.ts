class ITreeNode {
  nodeName: string;
  nodeID: number;
  nodeParentID: number;
  nodeChildren: ITreeNode[];
  nodeSelected: boolean;
  nodeDescendantSelected: boolean;
  nodeAuthorized: boolean;
  nodeInactive: boolean;
  nodeSearchBreanch: boolean;
}

class Hello {
  orgUnits: any = [
    {
      companyid: "114776",
      companyname: "NRT PbZ Ohio",
      parentid: "101476"
    },
    {
      companyid: "114928",
      companyname: "NRT IL Belmont",
      parentid: "101474"
    }
  ];

  buildTreeMap(): void {
    for (let org of this.orgUnits) {
      let newNode = new ITreeNode();

      newNode.nodeName = org.companyname;
      newNode.nodeID = org.companyid;
      newNode.nodeParentID = org.parentid;
      newNode.nodeSelected = false;
      newNode.nodeDescendantSelected = false;
      newNode.nodeAuthorized = true;
      newNode.nodeInactive = false;
      newNode.nodeSearchBreanch = false;
      newNode.nodeChildren = [];

      console.log(newNode);
    }
  }
}

// let x = new Hello();
// x.buildTreeMap();
