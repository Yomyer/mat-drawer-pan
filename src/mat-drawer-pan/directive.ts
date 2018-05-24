import { Directive, HostListener, HostBinding, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatDrawerContainer } from '@angular/material';
import 'hammerjs';

@Directive({
  selector: 'mat-drawer-container[mat-drawer-pan]',
  exportAs: 'mat-drawer-pan'
})
export class MatDrawerPanDirective implements AfterViewInit {
  action = 50;
  offset = 30;
  width = 200;
  current = null;
  active = false;
  isOpen = false;

  get backdrop() {
    if (this.drawer.hasBackdrop) {
      return this.el.nativeElement.querySelector('.mat-drawer-backdrop');
    }
    return null;
  }

  get content() {
    return this.el.nativeElement.querySelector('.mat-drawer-content');
  }


  @HostBinding('class.mat-drawer-transition') transition = true;
  @HostListener('pan', ['$event'])
  swipe(e) {
    const starX = e.changedPointers[0].pageX - e.deltaX;
    this.active = false;
    this.isOpen = false;

    // Open Drawer Start
    if (this.drawer.start && e.deltaX > 0 && starX <= this.action && (!this.drawer.end || !this.drawer.end.opened)) {
      if (!this.current || e.deltaX <= this.current._width + this.offset) {
        this.moveContent(e.deltaX);
      }

      this.current = this.drawer.start;
      this.render.setStyle(this.current._elementRef.nativeElement, 'visibility', 'visible');
      this.active = true;
    }
    // Close Drawer Start
    if (e.deltaX < 0 && (this.drawer.start && this.drawer.start.opened)) {
      let x = this.current._width + e.deltaX;
      if (x <= 0) {
        x = 0;
      }
      this.moveContent(x);
      this.active = true;
    }

    // Open Drawer End
    if (this.drawer.end && e.deltaX < 0 && starX >= this.content.offsetWidth - this.action && (!this.drawer.start || !this.drawer.start.opened)) {
      if (!this.current || (e.deltaX * -1 <= this.current._width + this.offset)) {
        this.moveContent(e.deltaX * -1);
      }
      this.current = this.drawer.end;
      this.render.setStyle(this.current._elementRef.nativeElement, 'visibility', 'visible');
      this.active = true;
    }

    // Close Drawer Start
    if (e.deltaX > 0 && (this.drawer.end && this.drawer.end.opened)) {
      let x = this.current._width - e.deltaX;
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
    if (!this.active) {
      return;
    }

    let des = e.deltaX;
    let velocity = e.velocityX;

    if (this.current._position === 'end') {
      des = des * -1;
      velocity = velocity * -1;
    }

    if (Math.abs(velocity) >= 1) {
      if (velocity >= 0) {
        this.moveContent(this.current._width);
        this.current.open();
      } else {
        this.close();
        this.drawer.close();
      }
    } else {
      if (des <= 0) {
        des = this.current._width + des;
      }

      if (des >= this.current._width / 3) {
        this.moveContent(this.current._width);
        this.current.open();
        setTimeout(() => {
          this.isOpen = true;
        });
      } else {
        this.close();
        this.drawer.close();
      }
    }
  }

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private drawer: MatDrawerContainer
  ) {

  }
  ngAfterViewInit() {
    if (this.drawer.hasBackdrop) {
      this.render.setStyle(this.backdrop, 'transition-duration', '.4s');
      this.render.setStyle(this.backdrop, 'transition-timing-function', 'cubic-bezier(.25,.8,.25,1)');
      this.render.setStyle(this.backdrop, 'transition-property', 'opacity,background-color,visibility,transform,margin-left,margin-right');
      this.render.setStyle(this.backdrop, 'background-color', 'rgba(0,0,0,.6)');
      this.render.setStyle(this.backdrop, 'opacity', 0);
    }

    if (this.drawer.start) {
      this.drawer.start.closedStart.subscribe(() => {
        this.close();
      });
      this.drawer.start.openedStart.subscribe(() => {
        this.open(this.drawer.start);
      });
      this.drawer.start.disableClose = true;

    }
    if (this.drawer.end) {
      this.drawer.end.closedStart.subscribe(() => {
        this.close();
      });
      this.drawer.end.openedStart.subscribe(() => {
        this.open(this.drawer.end);
      });
      this.drawer.end.disableClose = true;
    }


    this.drawer.backdropClick.subscribe((e) => {
      if (this.isOpen) {
        this.drawer.close();
      }
    });
  }

  close() {
    this.moveContent(0);
    this.isOpen = false;
  }

  open(drawer) {
    this.current = drawer;
    this.moveContent(this.current._width);
    this.isOpen = true;
  }

  moveContent(position) {
    if (this.current && this.current._position === 'end') {
      position *= -1;
    }

    const opacity = Math.abs(this.current ? (position * 100) / this.current._width : 0);

    this.render.setStyle(this.content, 'marginLeft', position + 'px');
    this.render.setStyle(this.content, 'marginRight', (-position) + 'px');
    if (this.drawer.hasBackdrop) {
      this.render.setStyle(this.backdrop, 'marginLeft', position + 'px');
      this.render.setStyle(this.backdrop, 'marginRight', (-position) + 'px');

      this.render.setStyle(this.backdrop, 'opacity', opacity / 100);
      if (opacity >= 5) {
        this.render.setStyle(this.backdrop, 'visibility', 'visible');
      } else {
        this.render.setStyle(this.backdrop, 'visibility', 'hidden');
      }
    }
  }
}
