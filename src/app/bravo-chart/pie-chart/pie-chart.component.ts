import { Component, OnInit } from '@angular/core';

import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  sum!: number;
  data!: any[];

  constructor() {
    this.data = this.getData();
    this.sum = this.data.map((c) => c.value).reduce((sum, cur) => sum + cur);
  }

  ngOnInit(): void {}

  getLabelContent = (ht: chart.HitTestInfo) => {
    return wijmo.format('{name} {value:p2}', {
      name: ht.name,
      value: ht.value / this.sum,
    });
  };

  getData() {
    return [
      { day: 'T2', value: 500 },
      { day: 'T3', value: 450 },
      { day: 'T4', value: 400 },
      { day: 'T5', value: 350 },
      { day: 'T6', value: 300 },
    ];
  }
}
