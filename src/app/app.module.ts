
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDrawerPanDirective } from '../mat-drawer-pan';

@NgModule({
  imports: [BrowserModule, FormsModule, MatSidenavModule, BrowserAnimationsModule],
  declarations: [AppComponent, MatDrawerPanDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
