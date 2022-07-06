import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import * as wjc from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import { WjMenu } from '@grapecity/wijmo.angular2.input';

@Component({
  selector: 'bravo-range-time',
  templateUrl: './bravo-range-time.component.html',
  styleUrls: ['./bravo-range-time.component.css'],
})
export class BravoRangeTimeComponent implements OnInit, AfterViewInit {
  @ViewChild('select', { static: true }) select!: WjMenu;

  month = true;
  quarter = false;
  year = false;
  time = new Date();
  min!: Date;
  max!: Date;

  @Output() timeEvent = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit(): void {
    this.select.refreshed.addHandler(() => {
      this.select.header = this.select.header.replace(/:|<|>|\/|b/g, '');
      wjc.addClass(
        this.select.dropDown.childNodes[
          this.select.selectedIndex
        ] as HTMLElement,
        'selected'
      );
      this.select.dropDown.childNodes.forEach((element) => {
        wjc.setCss(element, {
          'margin-left': '20px',
        });
      });
    });
  }

  ngOnInit(): void {}

  onSelect(menu: input.Menu) {
    menu.formatItem.addHandler(() => {
      menu.header = menu.header.replace(/:|<|>|\/|b/g, '');
      menu.dropDown.childNodes.forEach((element) => {
        wjc.setCss(element, {
          'margin-left': '20px',
        });
      });
      wjc.addClass(
        menu.dropDown.childNodes[menu.selectedIndex] as HTMLElement,
        'selected'
      );
    });
  }

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
