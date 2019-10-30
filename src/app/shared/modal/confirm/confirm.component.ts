import { Component, OnInit } from '@angular/core';
import {ModalConfig} from "../modal-config";
import {ModalRef} from "../modal-ref";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  public inputData;

  constructor(
      public config: ModalConfig,
      public modal: ModalRef,
  ) {
    this.inputData = this.config.data;
  }

  ngOnInit() {
  }
  cancel() {
    this.modal.close(false);
  }
  confirm() {
    this.modal.close(true);
  }
}
