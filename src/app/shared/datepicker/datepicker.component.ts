import {
    AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type,
    ViewChild
} from '@angular/core';
import {InsertionDirective} from "./insertion.directive";
import {Subject} from "rxjs/index";
import * as moment from "moment";
import {DatepickerRef} from './patepicker-ref';
import {DatepickerConfig} from './datepicker-config';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnDestroy, AfterViewInit, OnInit {
    public inputData;
    weekDaysHeaders: Array<string> = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
    pickDate: any;
    grid: Array<any> = [];
    yearPicker: Array<any> = [];
    yearPreview: Array<any> = [];
    monthPicker: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthPreview: Array<any> = [];
    selectedDate: any;
    componentRef: ComponentRef<any>;
    todaysDate: any;
    yearsOpen = false;
    monthsOpen = false;


    @ViewChild(InsertionDirective)
    insertionPoint: InsertionDirective;

    private readonly _onClose = new Subject<any>();
    public onClose = this._onClose.asObservable();
    constructor(
        private config: DatepickerConfig,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef,
        private datePicker: DatepickerRef
    ) {
        this.todaysDate = moment();
        this.inputData = this.config.data;
    };

    ngOnInit() {
      this.pickDate = moment();
        this.updateLists();

    }
    ngOnDestroy() {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }
    ngAfterViewInit() {
      this.cd.detectChanges();

    }
    close() {
      //  this.datePicker.close(this.pickDate);
      this._onClose.next(this.pickDate);
    }

    getMonthPreview() {
        this.monthPreview = []

        const currentMonth = moment(this.pickDate).month();
        const previewLength = 3;
        const firstAvailable = currentMonth - ((previewLength -1) /2);
        for ( let i = 0; i < previewLength; i++ ) {
            this.monthPreview.push(this.monthPicker[firstAvailable + i]);
        }
    }

    getYearPreview() {
        this.yearPreview = [];
        const thisYear = moment(this.pickDate).year();
        const previewLength = 3;
        const firstAvailable = thisYear - ((previewLength - 1) / 2);
        for ( let i = 0; i < previewLength; i++ ) {
            this.yearPreview.push(firstAvailable + i);
        }
    }
    getYearGrid() {
        this.yearPicker = [];

        const thisYear = moment(this.pickDate).year();
        const yearsLength = 35;
        const firstAvailableYear = thisYear - ((yearsLength - 1) / 2);

        for ( let i = 0; i < yearsLength; i++ ) {
            this.yearPicker.push(firstAvailableYear + i);
        }
    }

    getDateGrid() {
        this.grid = [];
        const firstDay = moment(this.pickDate).startOf('month');
        const prevMonthDays = firstDay.weekday();
        const lastDay = moment(this.pickDate).endOf('month');
        const lastMonthDays = 6 - lastDay.weekday();
        const daysInMonth = this.pickDate.daysInMonth();
        const gridLength = prevMonthDays + lastMonthDays + daysInMonth;
        for ( let i = 0; i < gridLength; i++ ) {
            let obj: any = {};
            if (i < prevMonthDays || i > prevMonthDays + daysInMonth - 1) {
                obj.value = '';
                // obj.available = false;
            } else {
                obj.value = i - prevMonthDays + 1;
            }
            this.grid.push(obj);
        }
    }
    updateLists() {
        this.getDateGrid();
        this.getYearGrid();
        this.getYearPreview();
        this.getMonthPreview();
    }
    setYear(year: any) {
        this.pickDate.year(year);
       this.updateLists();
        this.selectedDate = this.dateFromNum();
        this.yearsOpen = false;
    }
    setMonth(month: any) {
        this.pickDate.month(month);
        this.updateLists();
        this.selectedDate = this.dateFromNum();
        this.monthsOpen = false;
    }
    setDay(day: any) {
        this.pickDate.day(day);
        this.selectedDate = this.dateFromNum(day.value);
    }
    dateFromNum( num?: number): any{
        if(!num){
            num = this.pickDate.get('date');
        }
        this.pickDate.date(num);
        let returnDate = moment(this.pickDate);
        return returnDate.date(num).format('DD/MM/YYYY');
    }
    setTodaysDate(){
        this.selectedDate = this.dateFromNum();
        this.updateLists();
    }

    isSelectedDay (day){
         return !!(this.selectedDate && this.selectedDate.split('/')[0] == day);

    }
    isSelectedMonth(month){
        return !!(this.selectedDate && this.monthPicker[parseInt(this.selectedDate.split('/')[1], 10) -1] == month);
    }
    isSelectedYear(year){
        return !!(this.selectedDate && this.selectedDate.split('/')[2] == year);
    }
    onOverlayClicked(evt?: MouseEvent) {
        this.close();
    }
    submit(e?: any){
        this.datePicker.close(moment(this.pickDate).format(this.inputData.format));
    }

    getOrder(key){

    }
}






