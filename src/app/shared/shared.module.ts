import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatepickerModule} from './datepicker/datepicker.module';
import {DragDashboardDirective} from './directives/drag-dashboard.directive';
import {ModalModule} from './modal/modal.module';

@NgModule({
  declarations: [
    DragDashboardDirective
  ],
  imports: [
    CommonModule,
    DatepickerModule,
    ModalModule
  ],
  exports: [
    DragDashboardDirective
  ]

})
export class SharedModule { }
