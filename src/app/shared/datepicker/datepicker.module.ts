import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { InsertionDirective } from './insertion.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      DatepickerComponent,
      InsertionDirective
  ],
    entryComponents: [
        DatepickerComponent
    ]

})
export class DatepickerModule { }
