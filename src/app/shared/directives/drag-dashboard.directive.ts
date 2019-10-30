import {Directive, ElementRef, HostListener, OnInit, Renderer2, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDragDashboard]'
})

//this drag and drop is very much work in progress. and is being built to overcome some of the issues common with google materials cdk drag (such as lack of flexible drag locations
export class DragDashboardDirective implements OnInit {

  @Output() positionChange = new EventEmitter<any>();
  @Output() newPosition = new EventEmitter<any>();

  public dragging = false;
  docked = true;

  private currentX;
  private currentY;
  private initialX;
  private initialY;
  private offsetX = 0;
  private offsetY = 0;
  private currentElement;

  constructor(
      private elementRef:  ElementRef,
      private renderer: Renderer2
  ) {
  }

  @HostListener('mousedown', ['$event']) onMouseDown(e) {
        this.initialX = e.clientX - this.offsetX;
        this.initialY = e.clientY - this.offsetY;
        this.currentElement = e.target;
        this.dragging = true;
    }
  @HostListener('mousemove', ['$event']) onMouseMove(e) {

    if (this.dragging) {
      e.preventDefault();
      this.currentX = e.clientX - this.initialX;
      this.currentY = e.clientY - this.initialY;

      this.offsetX = this.currentX;
      this.offsetY = this.currentY;

      this.setTranslate(this.currentX, this.currentY, e.target);
    } else {
      //console.log (e);
    }
  }

  @HostListener('mouseup', ['$event']) onMouseUp(e) {

      this.currentX = undefined;
      this.currentY = undefined;
      this.offsetX = 0;
      this.offsetY = 0;
      this.dragging = false;
      this.elementRef.nativeElement.style = '';
      this.currentElement = null;
      console.log(this.elementRef);
      this.positionChange.emit(+this.elementRef.nativeElement.attributes['data-order'].value);
  }

  @HostListener('mouseover', ['$event']) onMouseOver(e) {
      this.newPosition.emit(+this.elementRef.nativeElement.attributes['data-order'].value);
  }

  ngOnInit() {

  }

  setTranslate(xPos, yPos, el) {
    this.elementRef.nativeElement.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
      this.elementRef.nativeElement.style['z-index'] = '10';
      this.elementRef.nativeElement.style.opacity = '0.7';

  }

}
