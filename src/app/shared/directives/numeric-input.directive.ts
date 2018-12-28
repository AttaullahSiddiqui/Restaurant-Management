import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[NumericInput]'
})
export class NumericInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onkeypress(event) {
    let evt = <KeyboardEvent>event;
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
        return evt.preventDefault();
    }
  };

};
