import {
    AfterViewInit, Type, Component, OnDestroy, OnInit, ComponentRef, ViewChild,
    ComponentFactoryResolver, ChangeDetectorRef
} from '@angular/core';
import { Subject } from "rxjs/index";
import {InsertionDirective} from "./insertion.directive";
import { ModalRef } from "./modal-ref";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnDestroy {

    modalHeader;
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;

  @ViewChild(InsertionDirective, {static: false})
  insertionPoint: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();


  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
      this.loadChildComponent(this.childComponentType);
      this.cd.detectChanges();
  }
  ngOnDestroy() {
    if (this.componentRef) {
        this.componentRef.destroy();
    }
  }

  close(){
      this._onClose.next();
  }

  loadChildComponent(componentType: Type<any>) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

      let viewContainerRef = this.insertionPoint.viewContainerRef;
      viewContainerRef.clear();

      this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
  onOverlayClicked(evt: MouseEvent) {

  }

  onModalClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

}
