import { Directive, HostBinding, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[passwordToggle]'
})
export class ShowHideInputDirective {

  @Input('appTargetInput') targetInput: any;

  constructor(el: ElementRef) {
  }

  @HostListener('click') onMouseEnter() {
    let inType = (this.targetInput.el.type == 'text')? 'password': 'text';
    this.targetInput.el.type = inType;
    if (inType == "password") {
      this.targetInput.el.nextSibling.firstElementChild.attributes[1].value = "eye-off";
    } else {
      this.targetInput.el.nextSibling.firstElementChild.attributes[1].value = "eye";
    }
}
}
