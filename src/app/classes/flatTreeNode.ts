import { ITreeNode } from "../Interfaces/ITreeNode";

export class FlatTreeNode {
  constructor(
    public node: ITreeNode,
    public level,
    public expandable: boolean = false,
    public isLoading: boolean = false
  ) {}
}
