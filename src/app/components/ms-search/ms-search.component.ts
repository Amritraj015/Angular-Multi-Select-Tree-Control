import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnChanges
} from "@angular/core";

@Component({
  selector: "ms-search",
  templateUrl: "./ms-search.component.html",
  styleUrls: ["./ms-search.component.less"]
})
export class MsSearchComponent implements OnChanges {
  @Output() searchTerm = new EventEmitter<string>();
  @Input() tabIndex: number;
  @ViewChild("searchBox") searchBox: ElementRef;

  ngOnChanges(): void {
    this.searchBox.nativeElement.value = "";
    this.searchTerm.emit("");
    this.searchBox.nativeElement.focus();
  }

  //===========================================================================================
  /**   Emits search term event to the ms-tree component */
  emitSearchTerm($searchTerm: string): void {
    this.searchTerm.emit($searchTerm);
  }
}
