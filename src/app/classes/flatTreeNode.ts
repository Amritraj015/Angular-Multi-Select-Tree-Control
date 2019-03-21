export class FlatTreeNode {
  constructor(
    public nodeID: number,
    public level = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false
  ) {}
}
