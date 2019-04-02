import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ɵConsole
} from "@angular/core";

@Component({
  selector: "ms-search",
  templateUrl: "./ms-search.component.html",
  styleUrls: ["./ms-search.component.less"]
})
export class MsSearchComponent {
  @Output() searchTerm = new EventEmitter<string>();
  @Input() tabIndex: number;

  constructor() {}

  //===========================================================================================
  /**   Emit the search term for the "highlight on search" feature on the "Shoe All" Tab */
  highlight($searchEvent: string): void {
    if ($searchEvent.length > 1) this.searchTerm.emit($searchEvent);
    else {
      $searchEvent = null;
      this.searchTerm.emit($searchEvent);
    }
  }

  //===========================================================================================
  /**   Emit an empty search term event to return to the top of the tree on "Show All" Tab */
  searchHighlight($searchEvent: string): void {
    this.searchTerm.emit($searchEvent);
  }
}
