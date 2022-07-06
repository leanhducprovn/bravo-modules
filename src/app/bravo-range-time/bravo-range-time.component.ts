import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import * as wjc from '@grapecity/wijmo';
import { WjMenu } from '@grapecity/wijmo.angular2.input';

@Component({
  selector: 'bravo-range-time',
  templateUrl: './bravo-range-time.component.html',
  styleUrls: ['./bravo-range-time.component.css'],
})
export class BravoRangeTimeComponent implements OnInit, AfterViewInit {
  @ViewChild('menu', { static: true }) menu!: WjMenu;

  time = new Date();
  min!: Date;
  max!: Date;

  periodType = PeriodType;

  @Output() timeEvent = new EventEmitter<any>();

  constructor() {}

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

  listMonth() {
    let listMonth: any = [];
    for (let i = 1; i <= 12; i++) {
      listMonth.push(i);
    }
    return listMonth;
  }

  listYear() {
    let listYear: any = [new Date().getFullYear()];
    let currentYear = new Date().getFullYear();
    for (let i = 0; i < 9; i++) {
      currentYear++;
      listYear.push(currentYear);
    }
    return listYear;
  }

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
