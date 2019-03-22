import { ITreeNode } from "../Interfaces/ITreeNode";

export class FlatTreeNode {
  constructor(
    public node: ITreeNode,
    public level = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false
  ) {}
}
