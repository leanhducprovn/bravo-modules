import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import * as input from '@grapecity/wijmo.input';
import { WjMenu } from '@grapecity/wijmo.angular2.input';

@Component({
  selector: 'bravo-range-time',
  templateUrl: './bravo-range-time.component.html',
  styleUrls: ['./bravo-range-time.component.css'],
})
export class BravoRangeTimeComponent implements OnInit {
  @ViewChild('select', { static: true }) select!: WjMenu;

  constructor() {}

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
    console.log(menu.header);
  }
}

enum PeriodType {
  Month = 0,
  Quarter = 1,
  Year = 2,
  Custom = 3,
}
