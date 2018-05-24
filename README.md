# @yomyer/mat-drawer-pan


Add to the Mat Drawer Container the possibility of showing the Drawers using the horizontal pan gesture. Compatible with Angular Material 6

### Installation

Install the library
```sh
$ npm install --save @yomyer/mat-drawer-pan
```

### Usage

Import it in your Angular project as a module

1) Declare it in your module
    ```sh
    import {MadDrawerModule} from '@yomyer/mat-drawer-pan';
    
    @NgModule({
      imports: [
        MadDrawerModule,
        ...
      ]
    })
    
    ```
2) Add hammerjs in your angular proyect
    ```sh
    "projects": {
      "architect": {
        "build": {
          "options": { 
            "scripts": [
              ...
              "node_modules/hammerjs/hammer.js" 
              ... 
            ]
    
    ```

3) Use it in a component
    
    **Add mat-drawer-pan in mat-drawer-container!**
    ```sh
   import {Component} from '@angular/core';
   
    @Component({
      selector: 'drawer',
      template: `
          <mat-drawer-container class="example-container" mat-drawer-pan>
            <mat-drawer #start class="example-sidenav" mode="push">
               <p>Auto-resizing sidenavd start</p>
            </mat-drawer>
            <mat-drawer #end class="example-sidenav" mode="push" position="end">
              <p>Auto-resizing sidenavd end</p>
            </mat-drawer>
            <div class="example-sidenav-content">
              <button type="button" mat-button (click)="start.toggle()">
                Toggle sidenav start
              </button>
              <button type="button" mat-button (click)="end.toggle()">
                Toggle sidenav end
              </button>
            </div>
          </mat-drawer-container>
        `
    })
    
    export class AppComponent {}
    ```

   Parameters:
    
  | Parameter | Description | Values |
  | --- | --- | --- |
  | `mat-drawer-pan` (required) | Selector for the directive. | boolean (defaults to `true`)


### Development
Want to contribute? Great!
Simply, clone the repository!

License
----
ISC


**- Yomyer**
  