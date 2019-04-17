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
  @Output() private searchTerm = new EventEmitter<string>();
  @Input() private tabIndex: number;
  @ViewChild("searchBox") private searchBox: ElementRef;
  searchHint: string;

  constructor() {
    this.searchHint = "Type at least two characters to Search";
  }

  ngOnChanges(): void {
    this.searchBox.nativeElement.value = "";
    this.searchTerm.emit("");
    console.log("emiting search term");
    this.searchBox.nativeElement.focus();
  }

  //===========================================================================================
  /** Emits search term to the ms-tree component */
  emitSearchTerm($searchTerm: string): void {
    if ($searchTerm.length < 2 || $searchTerm === "") this.searchTerm.emit("");
    else this.searchTerm.emit($searchTerm);
  }
}
