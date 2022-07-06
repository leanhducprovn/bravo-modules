import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

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

  defaultValue = 0;

  ngOnInit(): void {
    let _enums = [];
    for (const key in PeriodType) {
      if (Object.prototype.hasOwnProperty.call(PeriodType, key)) {
        const element = PeriodType[key];
        _enums.push(element);
      }
    }
    _enums = _enums.filter((n) => typeof n === 'number');
    for (const _e of _enums) {
    }
  }

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
    console.log(menu.header);
  }
}

enum PeriodType {
  Month = 0,
  Quarter = 1,
  Year = 2,
  Custom = 3,
}
