import { Directive, HostListener, HostBinding, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatDrawerContainer } from '@angular/material';

@Directive({
  selector: '[mat-drawer-swipe]'
})
export class MatDrawerSwipeDirective implements AfterViewInit {
  action = 50;
  offset = 50;
  width = 200;
  current = null;
  active = false;

  get backdrop() {
    return this.el.nativeElement.querySelector('.mat-drawer-backdrop');
  }

  get content() {
    return this.el.nativeElement.querySelector('.mat-drawer-content');
  }


  @HostBinding('class.mat-drawer-transition') transition = true;
  @HostListener('pan', ['$event'])
  swipe(e) {
    const starX = e.changedPointers[0].pageX - e.deltaX;
    this.active = false;
    //console.log(e.deltaX);
    //console.log(this.drawer.start._width);
    //console.log(this.drawer.end);

    // Open Drawer Start
    if (e.deltaX >= 0 && starX <= this.action) {
      if ((!this.current || e.deltaX <= this.current._width + this.offset)) {
        this.moveContent(e.deltaX);
      }

      this.current = this.drawer.start;
      this.render.setStyle(this.current._elementRef.nativeElement, 'visibility', 'visible');
      this.active = true;
    }
    // Close Drawer Start
    if (e.deltaX < 0 && this.drawer.start.opened) {
      let x = this.current._width + e.deltaX;
      if (x <= 0) {
        x = 0;
      }
      this.moveContent(x);
      this.active = true;
    }


    e.preventDefault();
  }

  @HostListener('panend', ['$event'])
  panend(e) {
    console.log("pandend");
    if (!this.active) {
      return;
    }

    console.log(e.deltaX >= this.current._width / 3);
    if (e.deltaX >= this.current._width / 3) {
      this.moveContent(this.current._width);
      this.drawer.start.open();
    } else {
      this.close();
      this.drawer.close();
    }
  }

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private drawer: MatDrawerContainer
  ) {
    console.log(this.el.nativeElement);
  }
  ngAfterViewInit() {
    this.render.setStyle(this.backdrop, 'transition-duration', '.4s');
    this.render.setStyle(this.backdrop, 'transition-timing-function', 'cubic-bezier(.25,.8,.25,1)');
    this.render.setStyle(this.backdrop, 'transition-property', 'background-color,visibility,transform,margin-left,margin-right');

    this.drawer.start.closedStart.subscribe(() => {
      this.close();
    });
    this.drawer.start.openedStart.subscribe(() => {
      this.open();
    });
  }

  close() {
    this.moveContent(0);
  }

  open() {
    this.current = this.drawer.start;
    this.moveContent(this.current._width);
  }

  moveContent(position) {
    this.render.setStyle(this.content, 'marginLeft', position + 'px');
    this.render.setStyle(this.content, 'marginRight', (-position) + 'px');
    this.render.setStyle(this.backdrop, 'marginLeft', position + 'px');
    this.render.setStyle(this.backdrop, 'marginRight', (-position) + 'px');
  }
}
