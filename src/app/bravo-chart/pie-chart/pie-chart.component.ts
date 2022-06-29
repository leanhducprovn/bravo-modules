import { Component, OnInit, ViewChild } from '@angular/core';

import { FlexPie } from '@grapecity/wijmo.chart';

import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @ViewChild('pieChart', { static: true }) pieChart!: FlexPie;

  sum!: number;

  constructor() {}

  ngOnInit(): void {
    this.pie();
  }

  pie() {
    this.pieChart.palette = [
      '#e63946',
      '#00bbf9',
      '#fee440',
      '#38b000',
      '#9c89b8',
    ];

    this.pieChart.itemsSource = [
      { day: 'T2', value: 500 },
      { day: 'T3', value: 450 },
      { day: 'T4', value: 400 },
      { day: 'T5', value: 350 },
      { day: 'T6', value: 300 },
    ];

    this.pieChart.header = 'Pie Chart';
    this.pieChart.bindingName = 'day';
    this.pieChart.binding = 'value';

    this.sum = this.pieChart.itemsSource
      .map((c: any) => c.value)
      .reduce((sum: any, cur: any) => sum + cur);
  }

  content = (ht: chart.HitTestInfo) => {
    return wijmo.format('{name} {value:p2}', {
      name: ht.name,
      value: ht.value / this.sum,
    });
  };

  click(event: any) {
    event.hostElement.addEventListener('click', (element: any) => {
      console.log(event.hitTest(element).name);
    });
  }
}
