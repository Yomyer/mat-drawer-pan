import { MatDrawerPanDirective } from './directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MatDrawerPanDirective],
  exports: [MatDrawerPanDirective]
})
export class MadDrawerModule { }
