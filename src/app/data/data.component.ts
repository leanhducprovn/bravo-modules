// library
import { Options } from '@angular-slider/ngx-slider';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// enum
import { FlowDirection } from '../data-types/enum/flow-direction';
import { AppearanceStyleEnum } from '../data-types/enum/appearance-style-enum';
import { SliderTickStyle } from '../data-types/enum/slider-tick-style';
import { SliderLabelDisplay } from '../data-types/enum/slider-label-display';
import { SliderLabelPosition } from '../data-types/enum/slider-label-position';

// component
import { BravoRangeSliderComponent } from '../bravo-range-slider/bravo-range-slider.component';
import { BravoChecklistComponent } from '../bravo-checklist/bravo-checklist.component';
import { BravoSliderBaseComponent } from '../bravo-slider-base/bravo-slider-base.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, AfterViewInit {
  /*------------------------------------*/
  // #sliderBase viewchild
  @ViewChild('sliderBase', { static: true })
  viewSliderBase!: BravoSliderBaseComponent;
  /*------------------------------------*/

  /*------------------------------------*/
  // rangeSlider viewchild
  @ViewChild('rangeSlider', { static: true })
  viewRangeSlider!: BravoRangeSliderComponent;
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
  public SliderLabelDisplay = SliderLabelDisplay;
  public SliderLabelPosition = SliderLabelPosition;
  /*------------------------------------*/

  /*------------------------------------*/
  // bravo slider
  public optionsSlider!: Options;
  public formRangeSlider!: FormGroup;
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

  public codeRangeSliderHTML = `  <form [formGroup]="formRangeSlider">
      <bravo-range-slider #slider formControlName="dataRangeSlider">
      </bravo-range-slider>
  </form>`;

  public codeRangeSliderTS = `  // default slider
  this.formRangeSlider = this.fb.group({
      dataRangeSlider: [[10, 90]],
  });

  // get event
  this.formRangeSlider.valueChanges.subscribe((value) => {
      console.log(value);
  });

  // custom slider

  // options
  this.viewRangeSlider.options.floor = 0;
  this.viewRangeSlider.options.ceil = 100;
  this.viewRangeSlider.options.step = 10;
  this.viewRangeSlider.options.noSwitching = true;

  // tickStyle
  this.viewRangeSlider.tickStyle = SliderTickStyle.Both;
  this.viewRangeSlider.tickWidth = '1px';
  this.viewRangeSlider.tickHeight = '6px';
  this.viewRangeSlider.tickTop = '-2px';
  this.viewRangeSlider.tickMarginLeft = '6px';
  this.viewRangeSlider.tickColor = '#178BE3';

  // barStyle
  this.viewRangeSlider.barSize = '2px';
  this.viewRangeSlider.barTop = '0px';
  this.viewRangeSlider.barColor = '#B9B9B9';
  this.viewRangeSlider.barSelectionColor = '#0079D7';

  // pointerStyle
  this.viewRangeSlider.pointerSize = '10px';
  this.viewRangeSlider.pointerTop = '-6px';
  this.viewRangeSlider.pointerColor = '#1E90FF';
  this.viewRangeSlider.pointerBorderSize = '2px';
  this.viewRangeSlider.pointerBorderType = 'solid';
  this.viewRangeSlider.pointerBorderColor = '#FFFFFF';
  this.viewRangeSlider.pointerBorderRadius = '100%';

  // labelStyle
  this.viewRangeSlider.labelDisplayStyle = SliderLabelDisplay.Tick;
  this.viewRangeSlider.labelPositionStyle = SliderLabelPosition.Below;
  this.viewRangeSlider.labelSize = '85%';
  this.viewRangeSlider.labelTop = '10px';
  this.viewRangeSlider.labelColor = 'inherit';`;

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
    // bravo slider base

    // custom slider base

    // options
    this.viewSliderBase.options.floor = 0;
    this.viewSliderBase.options.ceil = 100;
    this.viewSliderBase.options.showSelectionBar = true;
    this.viewSliderBase.options.getLegend = this.viewSliderBase.getLegend;

    // tick style
    // this.viewSliderBase.tickStyle = SliderTickStyle.None;
    // this.viewSliderBase.tickStyle = SliderTickStyle.Both;
    // this.viewSliderBase.tickStyle = SliderTickStyle.TopLeft;
    this.viewSliderBase.tickStyle = SliderTickStyle.BottomRight;

    // label display
    // this.viewSliderBase.labelDisplay = SliderLabelDisplay.None;
    // this.viewSliderBase.labelDisplay = SliderLabelDisplay.MinMax;
    // this.viewSliderBase.labelDisplay = SliderLabelDisplay.Tick;

    // label position
    // this.viewSliderBase.labelPosition = SliderLabelPosition.Above;
    // this.viewSliderBase.labelPosition = SliderLabelPosition.Below;

    /*------------------------------------*/

    /*------------------------------------*/
    // bravo range slider

    // default slider
    this.formRangeSlider = this.fb.group({
      dataRangeSlider: [[10, 90]],
    });

    // get event
    this.formRangeSlider.valueChanges.subscribe((value) => {
      console.log(value);
    });

    // custom range slider

    // options
    this.viewRangeSlider.options.floor = 0;
    this.viewRangeSlider.options.ceil = 100;
    this.viewRangeSlider.options.step = 10;
    this.viewRangeSlider.options.noSwitching = true;

    // tickStyle
    this.viewRangeSlider.tickStyle = SliderTickStyle.Both;
    this.viewRangeSlider.tickWidth = '1px';
    this.viewRangeSlider.tickHeight = '6px';
    this.viewRangeSlider.tickTop = '-2px';
    this.viewRangeSlider.tickMarginLeft = '6px';
    this.viewRangeSlider.tickColor = '#178BE3';

    // barStyle
    this.viewRangeSlider.barSize = '2px';
    this.viewRangeSlider.barTop = '0px';
    this.viewRangeSlider.barColor = '#B9B9B9';
    this.viewRangeSlider.barSelectionColor = '#0079D7';

    // pointerStyle
    this.viewRangeSlider.pointerSize = '10px';
    this.viewRangeSlider.pointerTop = '-6px';
    this.viewRangeSlider.pointerColor = '#1E90FF';
    this.viewRangeSlider.pointerBorderSize = '2px';
    this.viewRangeSlider.pointerBorderType = 'solid';
    this.viewRangeSlider.pointerBorderColor = '#FFFFFF';
    this.viewRangeSlider.pointerBorderRadius = '100%';

    // labelStyle
    this.viewRangeSlider.labelDisplayStyle = SliderLabelDisplay.Tick;
    this.viewRangeSlider.labelPositionStyle = SliderLabelPosition.Below;
    this.viewRangeSlider.labelSize = '85%';
    this.viewRangeSlider.labelTop = '10px';
    this.viewRangeSlider.labelColor = 'inherit';

    /*------------------------------------*/
  }

  /*------------------------------------*/
  // range time
  public timeEvent(min: Date, max: Date) {
    console.log(min, '=>', max);
  }
  /*------------------------------------*/
}
