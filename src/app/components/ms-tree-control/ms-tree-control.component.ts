import {
  Component,
  Input,
  ElementRef,
  SecurityContext,
  OnInit
} from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { GetTreeService } from "src/app/services/get-tree.service";

@Component({
  selector: "ms-tree-control",
  templateUrl: "./ms-tree-control.component.html",
  styleUrls: ["./ms-tree-control.component.less"]
})
export class MsTreeControlComponent implements OnInit {
  totalNodesSelected: number;
  headerText: string;
  renderTreeDiv: boolean;
  @Input() flatTreeNodes: ITreeNode[];
  @Input() disableSearch: boolean;

  constructor(public treeService: GetTreeService) {
    this.totalNodesSelected = 0;
    this.headerText = "Select User Groups";
    this.renderTreeDiv = false;
  }

  ngOnInit(): void {
    this.treeService.flatTreeNodes = this.flatTreeNodes;
  }

  //==========================================================================
  /** Updates the node Selection count on the control header */
  updateSelectedCount(selectedCount: number): void {
    this.totalNodesSelected = selectedCount;
    this.renderTree(true);
  }

  //==========================================================================
  /** Renders the Selected Count on the expansion pannel header */
  renderTree(firedFromUpdateSelectedCount?: boolean): boolean {
    if (!this.renderTreeDiv) this.totalNodesSelected = 0;

    if (!firedFromUpdateSelectedCount) {
      this.headerText = !this.renderTreeDiv
        ? " Selected"
        : "Select User Groups";
      return (this.renderTreeDiv = !this.renderTreeDiv);
    }

    this.headerText = " Selected";
  }
}
