import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { MatDrawerContainer } from '@angular/material';

@Directive({
  selector: '[mat-drawer-swipe]'
})
export class MatDrawerSwipeDirective {
  offset = 50;
  width = 200;
  current = null;
  
  get backdrop() {
    return this.el.nativeElement.querySelector('.mat-drawer-backdrop')
  }

  get content() {
    return this.el.nativeElement.querySelector('.mat-drawer-content');
  }


  @HostBinding('class.mat-drawer-transition') transition = true;
  @HostListener('pan', ['$event'])
  swipe(e) {
    const starX = e.changedPointers[0].pageX - e.deltaX;

    //console.log(e.deltaX);
    //console.log(this.drawer.start._width);
    //console.log(this.drawer.end);

    if (e.deltaX >= 0 && starX <= this.offset) {
      this.render.setStyle(this.content, 'marginLeft', e.deltaX + 'px');
      this.render.setStyle(this.content, 'margin-right', (-e.deltaX) + 'px');
      this.current = this.drawer.start;

      this.render.setStyle(this.current._elementRef.nativeElement, 'visibility', 'visible');
    }
  }
  @HostListener('panend', ['$event'])
  panend(e) {
    if (e.deltaX >= this.current._width / 3) {
      this.render.setStyle(this.content, 'marginLeft', this.current._width + 'px');
      this.render.setStyle(this.content, 'margin-right', (-this.current._width) + 'px');
      this.drawer.start.open();
    } else {
      this.render.setStyle(this.content, 'marginLeft', '0px');
      this.render.setStyle(this.content, 'margin-right', '0px');
      this.drawer.close();
    }
  }

  constructor(private el: ElementRef, private render: Renderer2, private drawer: MatDrawerContainer) {
    console.log(this.el.nativeElement);
  }
}
