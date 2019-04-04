import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ɵConsole,
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
  }
  //===========================================================================================
  /**   Emit the search term for the "highlight on search" feature on the "Shoe All" Tab */
  highlight($searchEvent: string): void {
    if ($searchEvent.length > 1) this.searchTerm.emit($searchEvent);
    else {
      this.searchTerm.emit("");
    }
  }

  //===========================================================================================
  /**   Emit an empty search term event to return to the top of the tree on "Show All" Tab */
  searchHighlight($searchTerm: string): void {
    this.searchTerm.emit($searchTerm);
  }
}
