import { Directive, OnInit, ElementRef } from "@angular/core";

@Directive({
  selector: "[inputAutoFocus]"
})
export class AutofocusDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.focus();
  }

  ngOnInit(): void {}
}
