import { Directive, HostBinding, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[passwordToggleCp]'
})
export class ShowHideInputCpDirective {

  @Input('appTargetInput1') targetInput: any;

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
