import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  // bravo slider
  optionsSlider!: Options;

  formSlider = this.fb.group({
    dataSlider: [[50, 150]],
  });

  // checklist data
  tradingData = [
    {
      name: 'CustomerCareTrading',
      text: 'Chăm sóc khách hàng',
      value: 'CustomerCareTradingCode',
    },
    {
      name: 'OrderTrading',
      text: 'Yêu cầu / Khiếu nại',
      value: 'OrderTradingCode',
    },
  ];

  ratingData = [
    {
      name: 'AttitudeRating',
      text: 'Thái độ nhân viên',
      value: 'AttitudeRatingCode',
    },
    {
      name: 'QualityRating',
      text: 'Chất lượng sản phẩm, dịch vụ',
      value: 'QualityRatingCode',
    },
    {
      name: 'WorkRating',
      text: 'Chất lượng công việc',
      value: 'WorkRatingCode',
    },
  ];

  timingData = [
    {
      name: 'Month',
      text: 'Theo tháng',
      value: 'MonthCode',
    },
    {
      name: 'Quarter',
      text: 'Theo quý',
      value: 'QuarterCode',
    },
    {
      name: 'Year',
      text: 'Theo năm',
      value: 'YearCode',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // bravo slider
    this.optionsSlider = {
      floor: 0,
      ceil: 200,
    };

    this.formSlider.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  // bravo range time
  timeEvent(min: Date, max: Date) {
    console.log(min, '=>', max);
  }
}
