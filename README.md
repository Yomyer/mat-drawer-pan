# @yomyer/mat-drawer-pan



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
    
2) Use it in a component
    
    **The element that contains this directive should have a CSS width!**
    ```sh
   import {Component} from '@angular/core';
   
    @Component({
      selector: 'drawer',
      template: `
        `
    })
    
    export class AppComponent {}
    ```

   Parameters:
    
  | Parameter | Description | Values |
  | --- | --- | --- |
  | `fittext` (required) | Selector for the directive. | boolean (defaults to `true`)


### Development
Want to contribute? Great!
Simply, clone the repository!

License
----
ISC


**- Yomyer**
  