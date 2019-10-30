import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertionDirective } from './insertion.directive';
import {ModalConfig} from "./modal-config";
import { ConfirmComponent } from './confirm/confirm.component';
import {NewsFormComponent} from '../news/news-form/news-form.component';
import {ModalComponent} from './modal.component';

@NgModule({
  declarations: [
      ModalComponent,
      InsertionDirective,
      ConfirmComponent,
  ],
  imports: [
    CommonModule
  ],
    providers: [
        ModalConfig
    ],
    entryComponents: [ModalComponent, ConfirmComponent, NewsFormComponent]
})
export class ModalModule { }
