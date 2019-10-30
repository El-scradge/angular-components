import {Observable, Subject} from "rxjs/index";

export class DatepickerRef {
    constructor() {

   }

   close(result?: any) {
        this._afterClosed.next(result);
   }

   private readonly _afterClosed = new Subject<any>();
    afterClosed: Observable<any> = this._afterClosed.asObservable();
}