import { Options } from '@angular-slider/ngx-slider';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { BravoChecklistComponent } from '../bravo-checklist/bravo-checklist.component';

import { FlowDirection } from '../data-types/enum/flow-direction';
import { AppearanceStyleEnum } from '../data-types/enum/appearance-style-enum';
import { SliderTickStyle } from '../data-types/enum/slider-tick-style';
import { BravoSliderComponent } from '../bravo-slider/bravo-slider.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, AfterViewInit {
  /*------------------------------------*/
  // slider viewchild
  @ViewChild('slider', { static: true }) viewSlider!: BravoSliderComponent;
  /*------------------------------------*/

  /*------------------------------------*/
  // checklist viewchild
  @ViewChild('trading', { static: true }) viewTrading!: BravoChecklistComponent;
  @ViewChild('rating', { static: true }) viewRating!: BravoChecklistComponent;
  @ViewChild('timing', { static: true }) viewTiming!: BravoChecklistComponent;
  /*------------------------------------*/

  /*------------------------------------*/
  // public enum
  public FlowDirection = FlowDirection;
  public AppearanceStyleEnum = AppearanceStyleEnum;
  public SliderTickStyle = SliderTickStyle;
  /*------------------------------------*/

  /*------------------------------------*/
  // bravo slider
  public optionsSlider!: Options;
  public formSlider!: FormGroup;
  /*------------------------------------*/

  /*------------------------------------*/
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
  /*------------------------------------*/

  /*------------------------------------*/
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
  /*------------------------------------*/

  /*------------------------------------*/
  // code highlight

  public codeSlider = `  <bravo-slider
      formControlName="dataSlider"
      [options]="optionsSlider"
  >
  </bravo-slider>`;

  public codePieChart = `  <wj-flex-pie #pieChart [selectionMode]="'Point'" (initialized)="click(pieChart)">
      <wj-flex-pie-data-label [content]="content"></wj-flex-pie-data-label>
      <wj-flex-chart-animation [animationMode]="'Point'" [duration]="1000">
      </wj-flex-chart-animation>
  </wj-flex-pie>`;

  public codeRangeTime = `  <bravo-range-time
      [listMonth]="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
      [listQuarter]="['I', 'II', 'III', 'IV']"
      [listYear]="[2019, 2020, 2021, 2022, 2023, 2024, 2025]"
      (timeEvent)="timeEvent($event.minTime, $event.maxTime)"
  >
  </bravo-range-time>`;

  public codeChecklist = `  <!-- Dạng Checkbox, chỉ được phép chọn 1 giá trị -->
  <form [formGroup]="formTrading">
      <bravo-checklist
          #trading
          formControlName="dataActive"
          [zParentText]="'Loại giao dịch'"
          [dataList]="tradingData"
          [bAllowSelectMultiValue]="false"
          [eFlowDirection]="FlowDirection.TopDown"
          [zSeparator]="','"
      >
      </bravo-checklist>
  </form>
  <!-- Dạng Checkbox, được phép chọn nhiều giá trị -->
  <form [formGroup]="formRating">
      <bravo-checklist
          #rating
          formControlName="dataActive"
          [zParentText]="'Loại đánh giá'"
          [dataList]="ratingData"
          [bAllowSelectMultiValue]="true"
          [eFlowDirection]="FlowDirection.TopDown"
          [zSeparator]="','"
      >
      </bravo-checklist>
  </form>
  <!-- Dạng Button, được phép chọn nhiều giá trị -->
  <form [formGroup]="formTiming">
      <bravo-checklist
          #timing
          formControlName="dataActive"
          [zParentText]="'Thời gian'"
          [dataList]="timingData"
          [eAppearanceStyle]="AppearanceStyleEnum.Button"
          [bAllowSelectMultiValue]="true"
          [eFlowDirection]="FlowDirection.LeftToRight"
          [zSeparator]="';'"
      >
      </bravo-checklist>
  </form>`;
  /*------------------------------------*/

  constructor(private fb: FormBuilder) {}

  public ngAfterViewInit(): void {}

  public ngOnInit(): void {
    /*------------------------------------*/
    // bravo slider
    this.formSlider = this.fb.group({
      dataSlider: [[10, 90]],
    });
    this.formSlider.valueChanges.subscribe((value) => {
      console.log(value);
    });

    // custom slider
    this.viewSlider.tickStyle = SliderTickStyle.None;

    /*------------------------------------*/
  }

  /*------------------------------------*/
  // range time
  public timeEvent(min: Date, max: Date) {
    console.log(min, '=>', max);
  }
  /*------------------------------------*/
}
