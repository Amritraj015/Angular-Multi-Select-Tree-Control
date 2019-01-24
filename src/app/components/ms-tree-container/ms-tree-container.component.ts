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
    this.text = "Select User Groups";
    this.renderTreeDiv = false;
  }

  renderTree(): boolean {
    this.text = !this.renderTreeDiv
      ? `${this.count} Selected`
      : "Select User Groups";
    return (this.renderTreeDiv = !this.renderTreeDiv);
  }

  ngOnInit() {}
}
