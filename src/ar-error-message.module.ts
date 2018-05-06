import {NgModule, ModuleWithProviders} from '@angular/core';
import {ArErrorMessageComponent} from './ar-error-message-component';
import {IonicModule} from 'ionic-angular';

@NgModule({
  imports: [IonicModule],
  declarations: [
    // declare all components that your module uses
    ArErrorMessageComponent
  ],
  exports: [
    // export the component(s) that you want others to be able to use
    ArErrorMessageComponent
  ]
})
export class ArErrorMessageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ArErrorMessageModule
    };
  }
}
