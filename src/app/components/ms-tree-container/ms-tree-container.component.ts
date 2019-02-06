import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ms-tree-container",
  templateUrl: "./ms-tree-container.component.html",
  styleUrls: ["./ms-tree-container.component.less"]
})
export class MSTreeContainerComponent implements OnInit {
  count: number;
  text: string;
  renderTreeDiv: boolean;

  constructor() {
    this.count = 0;
    console.log("constructor fired");
    this.text = "Select User Groups";
    this.renderTreeDiv = false;
  }

  updateSelectedCount(totalSelectedCount: number): void {
    this.count = totalSelectedCount;
    this.renderTree(true);
  }

  renderTree(firedFromUpdateSelectedCount: boolean): boolean {
    if (!firedFromUpdateSelectedCount) {
      this.text = !this.renderTreeDiv
        ? `${this.count} Selected`
        : "Select User Groups";
      return (this.renderTreeDiv = !this.renderTreeDiv);
    }

    this.text = `${this.count} Selected`;
    return this.renderTreeDiv;
  }

  ngOnInit() {}
}
