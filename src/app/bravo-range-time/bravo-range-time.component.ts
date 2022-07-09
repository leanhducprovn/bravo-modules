import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import * as wjc from '@grapecity/wijmo';
import { Control } from '@grapecity/wijmo';
import { WjMenu } from '@grapecity/wijmo.angular2.input';

@Component({
  selector: 'bravo-range-time',
  templateUrl: './bravo-range-time.component.html',
  styleUrls: ['./bravo-range-time.component.css'],
})
export class BravoRangeTimeComponent
  extends Control
  implements OnInit, AfterViewInit
{
  @ViewChild('menu', { static: true }) menu!: WjMenu;

  private _listMonth!: number[];
  @Input()
  public set listMonth(pnValue: number[]) {
    this._listMonth = pnValue;
    this.invalidate();
  }
  public get listMonth(): number[] {
    return this._listMonth;
  }

  private _listYear!: number[];
  @Input()
  public set listYear(pnValue: number[]) {
    this._listYear = pnValue;
    this.invalidate();
  }
  public get listYear(): number[] {
    return this._listYear;
  }

  time = new Date();
  min!: Date;
  max!: Date;

  periodType = PeriodType;

  @Output() timeEvent = new EventEmitter<any>();

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean) {
    super.refresh(fullUpdate);
  }

  ngAfterViewInit(): void {
    this.menu.refreshed.addHandler(() => {
      this.menu.header = this.menu.header.replace(/:|<|>|\/|b/g, '');
      wjc.addClass(
        this.menu.dropDown.childNodes[this.menu.selectedIndex] as HTMLElement,
        'selected'
      );
      this.menu.dropDown.childNodes.forEach((element) => {
        wjc.setCss(element, {
          'margin-left': '20px',
        });
      });
    });
    this.menu.itemClicked.addHandler((menu) => {
      menu.header = this.menu.header.replace(/:|<|>|\/|b/g, '');
      menu.dropDown.childNodes.forEach((element) => {
        wjc.setCss(element, {
          'margin-left': '20px',
        });
        wjc.removeClass(element as HTMLElement, 'selected');
      });
      wjc.addClass(
        menu.dropDown.childNodes[menu.selectedIndex] as HTMLElement,
        'selected'
      );
    });
  }

  ngOnInit(): void {}

  onClickMonth(event: any) {
    this.min = new Date();
    this.max = new Date();
    this.min.setFullYear(this.time.getFullYear(), event.target.value - 1, 1);
    this.max.setFullYear(
      this.time.getFullYear(),
      event.target.value - 1,
      this.getDayOfMonth(this.time.getFullYear(), event.target.value)
    );
    this.timeEvent.emit({ minTime: this.min, maxTime: this.max });
  }

  onClickQuarter(event: any) {
    this.min = new Date();
    this.max = new Date();
    let quarter = event.target.textContent;
    if (quarter == 'I') {
      this.min.setFullYear(this.time.getFullYear(), 0, 1);
      this.max.setFullYear(
        this.time.getFullYear(),
        2,
        this.getDayOfMonth(this.time.getFullYear(), 3)
      );
      this.timeEvent.emit({ minTime: this.min, maxTime: this.max });
    } else if (quarter == 'II') {
      this.min.setFullYear(this.time.getFullYear(), 3, 1);
      this.max.setFullYear(
        this.time.getFullYear(),
        5,
        this.getDayOfMonth(this.time.getFullYear(), 6)
      );
      this.timeEvent.emit({ minTime: this.min, maxTime: this.max });
    } else if (quarter == 'III') {
      this.min.setFullYear(this.time.getFullYear(), 6, 1);
      this.max.setFullYear(
        this.time.getFullYear(),
        8,
        this.getDayOfMonth(this.time.getFullYear(), 9)
      );
      this.timeEvent.emit({ minTime: this.min, maxTime: this.max });
    } else if (quarter == 'IV') {
      this.min.setFullYear(this.time.getFullYear(), 9, 1);
      this.max.setFullYear(
        this.time.getFullYear(),
        11,
        this.getDayOfMonth(this.time.getFullYear(), 12)
      );
      this.timeEvent.emit({ minTime: this.min, maxTime: this.max });
    }
  }

  onClickYear(event: any) {
    this.min = new Date();
    this.max = new Date();
    this.min.setFullYear(event.target.value, 0, 1);
    this.max.setFullYear(event.target.value, 11, 31);
    this.timeEvent.emit({ minTime: this.min, maxTime: this.max });
  }

  getDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
}

enum PeriodType {
  Month,
  Quarter,
  Year,
  Custom,
}
