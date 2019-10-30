import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector,
    Type
} from '@angular/core';
import {DatepickerConfig} from "./datepicker-config";
import {DatepickerRef} from "./patepicker-ref";
import {DatepickerComponent} from "./datepicker.component";
import {DatepickerInjector} from "./datepicker-injector";

@Injectable()
export class DatepickerService {
   datepickerComponentRef: ComponentRef<DatepickerComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) { }

  public open( config: DatepickerConfig, event?) {
    console.log(event);
    const alertRef = this.appendDatepickerToBody(config, event.target);
    return alertRef;
  }
    getPosition(el) {
        let xPos = 0,
            yPos = 0;

        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                let yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    }
  private appendDatepickerToBody(config: DatepickerConfig, target) {
    const map = new WeakMap();
    map.set(DatepickerConfig, config);

    const datepickerRef = new DatepickerRef();
    map.set(DatepickerRef, datepickerRef);

    const sub = datepickerRef.afterClosed.subscribe((data) => {

      this.removeDatepickerFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DatepickerComponent);
    const componentRef = componentFactory.create(new DatepickerInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const offset = this.getPosition(target);

    document.body.appendChild(domElement);
    let element = document.getElementsByClassName('datepicker__container')[0];
    element.setAttribute('style', 'left:' + offset.x + 'px ; top:' + offset.y + 'px;');
    this.datepickerComponentRef = componentRef;

    this.datepickerComponentRef.instance.onClose.subscribe(() => {
      this.removeDatepickerFromBody();
    });
    return datepickerRef;
  }

  private removeDatepickerFromBody() {

      this.appRef.detachView(this.datepickerComponentRef.hostView);
      this.datepickerComponentRef.destroy();
  }


}

