import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bravo-chart',
  templateUrl: './bravo-chart.component.html',
  styleUrls: ['./bravo-chart.component.css'],
})
export class BravoChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clickPie(day: string, value: number) {
    console.log(day, value);
  }
}
