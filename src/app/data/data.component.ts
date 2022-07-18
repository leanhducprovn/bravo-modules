import { Options } from '@angular-slider/ngx-slider';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { BravoChecklistComponent } from '../bravo-checklist/bravo-checklist.component';

import { FlowDirection } from '../data-types/enum/flow-direction';
import { AppearanceStyleEnum } from '../data-types/enum/appearance-style-enum';

@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, AfterViewInit {
  // checklist viewchild
  @ViewChild('trading', { static: true }) viewTrading!: BravoChecklistComponent;
  @ViewChild('rating', { static: true }) viewRating!: BravoChecklistComponent;
  @ViewChild('timing', { static: true }) viewTiming!: BravoChecklistComponent;

  public FlowDirection = FlowDirection;
  public AppearanceStyleEnum = AppearanceStyleEnum;

  // bravo slider
  public optionsSlider!: Options;

  public formSlider = this.fb.group({
    dataSlider: [[50, 150]],
  });

  // checklist data
  public tradingData = [
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

  public ratingData = [
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

  public timingData = [
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

  // checklist form group
  public formTrading = this.fb.group({
    dataActive: ['CustomerCareTradingCode'],
  });

  public formRating = this.fb.group({
    dataActive: ['AttitudeRatingCode,WorkRatingCode'],
  });

  public formTiming = this.fb.group({
    dataActive: ['MonthCode;YearCode'],
  });

  constructor(private fb: FormBuilder) {}

  public ngAfterViewInit(): void {}

  public ngOnInit(): void {
    // bravo slider
    this.optionsSlider = {
      floor: 0,
      ceil: 200,
    };

    this.formSlider.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  // range time
  public timeEvent(min: Date, max: Date) {
    console.log(min, '=>', max);
  }
}
