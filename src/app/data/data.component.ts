// library
import { Options } from '@angular-slider/ngx-slider';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// enum
import { FlowDirection } from '../data-types/enum/flow-direction.enum';
import { AppearanceStyleEnum } from '../data-types/enum/appearance-style-enum.enum';
import { SliderTickStyle } from '../data-types/enum/slider-tick-style.enum';
import { SliderLabelDisplay } from '../data-types/enum/slider-label-display.enum';
import { SliderLabelPosition } from '../data-types/enum/slider-label-position.enum';
import { CodeType } from '../data-types/enum/code-type.enum';
import { BarCodeLabelPosition } from '../data-types/enum/barcode-label-position.enum';

// component
import { BravoRangeSliderComponent } from '../bravo-range-slider/bravo-range-slider.component';
import { BravoChecklistComponent } from '../bravo-checklist/bravo-checklist.component';
import { BravoSliderBaseComponent } from '../bravo-slider-base/bravo-slider-base.component';

// class
import { BravoBarCodeBox } from '../class/BravoBarCodeBox';

import { ElementRef } from '@angular/core';

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
  // barcode viewchild
  // @ViewChild('barcode', { static: true })
  // viewBarCode!: BravoBarcodeBoxComponent;
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

  // slider base
  public codeSliderBaseHTML = `<bravo-slider-base #sliderBase></bravo-slider-base>`;

  public codeSliderBaseTS = `  // options
  this.viewSliderBase.options.floor = 0;
  this.viewSliderBase.options.ceil = 100;
  this.viewSliderBase.options.showSelectionBar = true;
  this.viewSliderBase.options.getLegend = this.viewSliderBase.getLegend;

  // tick style
  this.viewSliderBase.tickStyle = SliderTickStyle.BottomRight;

  // label display
  this.viewSliderBase.labelDisplay = SliderLabelDisplay.Tick;

  // label position
  this.viewSliderBase.labelPosition = SliderLabelPosition.Below;`;

  // range slider
  public codeRangeSliderHTML = `  <form [formGroup]="formRangeSlider">
      <bravo-range-slider #rangeSlider formControlName="dataRangeSlider">
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

  // pie chart
  public codePieChart = `  <wj-flex-pie #pieChart [selectionMode]="'Point'" (initialized)="click(pieChart)">
      <wj-flex-pie-data-label [content]="content"></wj-flex-pie-data-label>
      <wj-flex-chart-animation [animationMode]="'Point'" [duration]="1000">
      </wj-flex-chart-animation>
  </wj-flex-pie>`;

  // range time
  public codeRangeTime = `  <bravo-range-time
      [listMonth]="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
      [listQuarter]="['I', 'II', 'III', 'IV']"
      [listYear]="[2019, 2020, 2021, 2022, 2023, 2024, 2025]"
      (timeEvent)="timeEvent($event.minTime, $event.maxTime)"
  >
  </bravo-range-time>`;

  // checklist
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
          [bShowCheckAll]="false"
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

  // codabar
  public codeCodabarTS = `    let codabar = new BravoBarCodeBox(document.getElementById('codabar'));
    codabar.type = CodeType.Codabar;
    codabar.value = 'A15126893B';
    codabar.color = 'red';
    codabar.backgroundColor = '#FFFF00';
    codabar.autoWidthZoom = 3;
    codabar.showLabel = true;
    codabar.labelPosition = BarCodeLabelPosition.Top;
    codabar.render();`;

  // code39
  public codeCode39TS = `    let code39 = new BravoBarCodeBox(document.getElementById('code39'));
    code39.type = CodeType.Code39;
    code39.value = 'A1312BCV';
    code39.color = '#32CD32';
    code39.backgroundColor = '#222222';
    code39.showLabel = false;
    code39.autoWidthZoom = 3;
    code39.render();`;

  // ansi39
  public codeAnsi39TS = `    let ansi39 = new BravoBarCodeBox(document.getElementById('ansi39'));
    ansi39.type = CodeType.Ansi39;
    ansi39.value = 'A1312ANSI';
    ansi39.autoWidthZoom = 3;
    ansi39.color = '#4682B4';
    ansi39.backgroundColor = '#FFF8DC';
    ansi39.render();`;

  // code49
  public codeCode49TS = `    let code49 = new BravoBarCodeBox(document.getElementById('code49'));
    code49.type = CodeType.Code49;
    code49.value = 'Code49_123';
    code49.color = '#000';
    code49.backgroundColor = '#fff';
    code49.showLabel = true;
    code49.labelPosition = BarCodeLabelPosition.Top;
    code49.render();`;

  // code 93
  public codeCode93TS = `    let code93 = new BravoBarCodeBox(document.getElementById('code93'));
    code93.type = CodeType.Code_93;
    code93.value = 'CODE93';
    code93.autoWidthZoom = 5;
    code93.autoWidth = true;
    code93.color = '#0000FF';
    code93.backgroundColor = '#C0C0C0';
    code93.showLabel = true;
    code93.labelPosition = BarCodeLabelPosition.Bottom;
    code93.render();`;

  // code128a
  public codeCode128ATS = `    let code128a = new BravoBarCodeBox(document.getElementById('code128a'));
    code128a.type = CodeType.Code_128_A;
    code128a.value = '99';
    code128a.autoWidthZoom = 5;
    code128a.autoWidth = true;
    code128a.color = '#FF00FF';
    code128a.backgroundColor = '#eeeeee';
    code128a.showLabel = true;
    code128a.labelPosition = BarCodeLabelPosition.Bottom;
    code128a.render();`;

  // code128b
  public codeCode128BTS = `    let code128b = new BravoBarCodeBox(document.getElementById('code128b'));
    code128b.type = CodeType.Code_128_B;
    code128b.value = 'Code128Demo';
    code128b.autoWidthZoom = 5;
    code128b.autoWidth = true;
    code128b.color = '#FF00FF';
    code128b.backgroundColor = '#eeeeee';
    code128b.showLabel = true;
    code128b.labelPosition = BarCodeLabelPosition.Bottom;
    code128b.render();`;

  // code128c
  public codeCode128CTS = `    let code128c = new BravoBarCodeBox(document.getElementById('code128c'));
    code128c.type = CodeType.Code_128_C;
    code128c.value = '99';
    code128c.autoWidthZoom = 5;
    code128c.autoWidth = true;
    code128c.color = '#FF00FF';
    code128c.backgroundColor = '#eeeeee';
    code128c.showLabel = true;
    code128c.labelPosition = BarCodeLabelPosition.Bottom;
    code128c.render();`;

  // code128auto
  public codeCode128AutoTS = `    let code128auto = new BravoBarCodeBox(
      document.getElementById('code128auto')
    );
    code128auto.type = CodeType.Code_128auto;
    code128auto.value = 'Code128Auto';
    code128auto.autoWidthZoom = 5;
    code128auto.autoWidth = true;
    code128auto.color = '#FF00FF';
    code128auto.backgroundColor = '#eeeeee';
    code128auto.showLabel = true;
    code128auto.labelPosition = BarCodeLabelPosition.Bottom;
    code128auto.render();`;

  // ean8
  public codeEan8TS = `    let ean8 = new BravoBarCodeBox(document.getElementById('ean8'));
    ean8.type = CodeType.EAN_8;
    ean8.value = '9031101';
    ean8.color = '#333333';
    ean8.backgroundColor = '#eeeeee';
    ean8.showLabel = true;
    ean8.labelPosition = BarCodeLabelPosition.Top;
    ean8.render();`;

  // ean13
  public codeEan13TS = `    let ean13 = new BravoBarCodeBox(document.getElementById('ean13'));
    ean13.type = CodeType.EAN_13;
    ean13.value = '963850741111';
    ean13.addOn = 86;
    ean13.color = '#333333';
    ean13.backgroundColor = '#eeeeee';
    ean13.showLabel = true;
    ean13.labelPosition = BarCodeLabelPosition.Bottom;
    ean13.addOnHeight = 'auto';
    ean13.addOnLabelPosition = BarCodeLabelPosition.Top;
    ean13.render();`;

  // japanesepostal
  public codeJapanesePostalTS = `    let japanesepostal = new BravoBarCodeBox(
      document.getElementById('japanesepostal')
    );
    japanesepostal.type = CodeType.JapanesePostal;
    japanesepostal.value = '6540123789-A-K-Z';
    japanesepostal.color = 'red';
    japanesepostal.backgroundColor = '#dddddd';
    japanesepostal.showLabel = true;
    japanesepostal.labelPosition = BarCodeLabelPosition.Top;
    japanesepostal.render();`;

  // pdf417
  public codePDF417TS = `    let pdf417 = new BravoBarCodeBox(document.getElementById('pdf417'));
    pdf417.type = CodeType.Pdf417;
    pdf417.value = 'This is a PDF417 barcode';
    pdf417.autoWidthZoom = 5;
    pdf417.autoWidth = true;
    pdf417.color = '#00FF33';
    pdf417.backgroundColor = '#000000';
    pdf417.render();`;

  // micropdf417
  public codeMicroPdf417TS = `    let micropdf417 = new BravoBarCodeBox(
      document.getElementById('micropdf417')
    );
    micropdf417.type = CodeType.MicroPDF417;
    micropdf417.value = 'This is a micropdf417 barcode';
    micropdf417.color = '#00FF33';
    micropdf417.backgroundColor = '#000000';
    micropdf417.render();`;

  // qrcode
  public codeQrCodeTS = `    let qrcode = new BravoBarCodeBox(document.getElementById('qrcode'));
    qrcode.type = CodeType.QRCode;
    qrcode.value = 'This is a qrcode barcode';
    qrcode.color = '#000';
    qrcode.backgroundColor = '#fff';
    qrcode.render();`;

  // upca
  public codeUPCATS = `    let upca = new BravoBarCodeBox(document.getElementById('upca'));
    upca.type = CodeType.UPC_A;
    upca.value = '01234567890';
    upca.addOn = 96;
    upca.color = '#222222';
    upca.backgroundColor = '#eeeeee';
    upca.showLabel = true;
    upca.labelPosition = BarCodeLabelPosition.Bottom;
    upca.addOnHeight = 'auto';
    upca.addOnLabelPosition = BarCodeLabelPosition.Top;
    upca.render();`;

  // upce0
  public codeUPCE0TS = `    let upce0 = new BravoBarCodeBox(document.getElementById('upce0'));
    upce0.type = CodeType.UPC_E0;
    upce0.value = '012345';
    upce0.color = '#222222';
    upce0.backgroundColor = '#eeeeee';
    upce0.showLabel = true;
    upce0.labelPosition = BarCodeLabelPosition.Bottom;
    upce0.render();`;

  // upce1
  public codeUPCE1TS = `    let upce1 = new BravoBarCodeBox(document.getElementById('upce1'));
    upce1.type = CodeType.UPC_E1;
    upce1.value = '012345';
    upce1.color = '#222222';
    upce1.backgroundColor = '#eeeeee';
    upce1.showLabel = true;
    upce1.labelPosition = BarCodeLabelPosition.Top;
    upce1.addOn = 99;
    upce1.addOnLabelPosition = BarCodeLabelPosition.Bottom;
    upce1.render();`;
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
    this.viewSliderBase.labelDisplay = SliderLabelDisplay.Tick;

    // label position
    // this.viewSliderBase.labelPosition = SliderLabelPosition.Above;
    this.viewSliderBase.labelPosition = SliderLabelPosition.Below;

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

    /*------------------------------------*/
    // bravo barcode box

    // codabar
    let codabar = new BravoBarCodeBox(document.getElementById('codabar'));
    codabar.type = CodeType.Codabar;
    codabar.value = 'A15126893B';
    codabar.color = 'red';
    codabar.backgroundColor = '#FFFF00';
    codabar.autoWidthZoom = 3;
    codabar.showLabel = true;
    codabar.labelPosition = BarCodeLabelPosition.Top;
    codabar.render();

    // code39
    let code39 = new BravoBarCodeBox(document.getElementById('code39'));
    code39.type = CodeType.Code39;
    code39.value = 'A1312BCV';
    code39.color = '#32CD32';
    code39.backgroundColor = '#222222';
    code39.showLabel = false;
    code39.autoWidthZoom = 3;
    code39.render();

    // ansi39
    let ansi39 = new BravoBarCodeBox(document.getElementById('ansi39'));
    ansi39.type = CodeType.Ansi39;
    ansi39.value = 'A1312ANSI';
    ansi39.autoWidthZoom = 3;
    ansi39.color = '#4682B4';
    ansi39.backgroundColor = '#FFF8DC';
    ansi39.render();

    // code49
    let code49 = new BravoBarCodeBox(document.getElementById('code49'));
    code49.type = CodeType.Code49;
    code49.value = 'Code49_123';
    code49.color = '#000';
    code49.backgroundColor = '#fff';
    code49.showLabel = true;
    code49.labelPosition = BarCodeLabelPosition.Top;
    code49.render();

    // code93
    let code93 = new BravoBarCodeBox(document.getElementById('code93'));
    code93.type = CodeType.Code_93;
    code93.value = 'CODE93';
    code93.autoWidthZoom = 5;
    code93.autoWidth = true;
    code93.color = '#0000FF';
    code93.backgroundColor = '#C0C0C0';
    code93.showLabel = true;
    code93.labelPosition = BarCodeLabelPosition.Bottom;
    code93.render();

    // code128A
    let code128a = new BravoBarCodeBox(document.getElementById('code128a'));
    code128a.type = CodeType.Code_128_A;
    code128a.value = '99';
    code128a.autoWidthZoom = 5;
    code128a.autoWidth = true;
    code128a.color = '#FF00FF';
    code128a.backgroundColor = '#eeeeee';
    code128a.showLabel = true;
    code128a.labelPosition = BarCodeLabelPosition.Bottom;
    code128a.render();

    // code128B
    let code128b = new BravoBarCodeBox(document.getElementById('code128b'));
    code128b.type = CodeType.Code_128_B;
    code128b.value = 'Code128Demo';
    code128b.autoWidthZoom = 5;
    code128b.autoWidth = true;
    code128b.color = '#FF00FF';
    code128b.backgroundColor = '#eeeeee';
    code128b.showLabel = true;
    code128b.labelPosition = BarCodeLabelPosition.Bottom;
    code128b.render();

    // code128C
    let code128c = new BravoBarCodeBox(document.getElementById('code128c'));
    code128c.type = CodeType.Code_128_C;
    code128c.value = '99';
    code128c.autoWidthZoom = 5;
    code128c.autoWidth = true;
    code128c.color = '#FF00FF';
    code128c.backgroundColor = '#eeeeee';
    code128c.showLabel = true;
    code128c.labelPosition = BarCodeLabelPosition.Bottom;
    code128c.render();

    // code128Auto
    let code128auto = new BravoBarCodeBox(
      document.getElementById('code128auto')
    );
    code128auto.type = CodeType.Code_128auto;
    code128auto.value = 'Code128Auto';
    code128auto.autoWidthZoom = 5;
    code128auto.autoWidth = true;
    code128auto.color = '#FF00FF';
    code128auto.backgroundColor = '#eeeeee';
    code128auto.showLabel = true;
    code128auto.labelPosition = BarCodeLabelPosition.Bottom;
    code128auto.render();

    // ean8
    let ean8 = new BravoBarCodeBox(document.getElementById('ean8'));
    ean8.type = CodeType.EAN_8;
    ean8.value = '9031101';
    ean8.color = '#333333';
    ean8.backgroundColor = '#eeeeee';
    ean8.showLabel = true;
    ean8.labelPosition = BarCodeLabelPosition.Top;
    ean8.render();

    // ean13
    let ean13 = new BravoBarCodeBox(document.getElementById('ean13'));
    ean13.type = CodeType.EAN_13;
    ean13.value = '963850741111';
    ean13.addOn = 86;
    ean13.color = '#333333';
    ean13.backgroundColor = '#eeeeee';
    ean13.showLabel = true;
    ean13.labelPosition = BarCodeLabelPosition.Bottom;
    ean13.addOnHeight = 'auto';
    ean13.addOnLabelPosition = BarCodeLabelPosition.Top;
    ean13.render();

    // japanese postal
    let japanesepostal = new BravoBarCodeBox(
      document.getElementById('japanesepostal')
    );
    japanesepostal.type = CodeType.JapanesePostal;
    japanesepostal.value = '6540123789-A-K-Z';
    japanesepostal.color = 'red';
    japanesepostal.backgroundColor = '#dddddd';
    japanesepostal.showLabel = true;
    japanesepostal.labelPosition = BarCodeLabelPosition.Top;
    japanesepostal.render();

    // pdf417
    let pdf417 = new BravoBarCodeBox(document.getElementById('pdf417'));
    pdf417.type = CodeType.Pdf417;
    pdf417.value = 'This is a PDF417 barcode';
    pdf417.autoWidthZoom = 5;
    pdf417.autoWidth = true;
    pdf417.color = '#00FF33';
    pdf417.backgroundColor = '#000000';
    pdf417.render();

    // micropdf417
    let micropdf417 = new BravoBarCodeBox(
      document.getElementById('micropdf417')
    );
    micropdf417.type = CodeType.MicroPDF417;
    micropdf417.value = 'This is a micropdf417 barcode';
    micropdf417.color = '#00FF33';
    micropdf417.backgroundColor = '#000000';
    micropdf417.render();

    // qrcode
    let qrcode = new BravoBarCodeBox(document.getElementById('qrcode'));
    qrcode.type = CodeType.QRCode;
    qrcode.value = 'This is a qrcode barcode';
    qrcode.color = '#000';
    qrcode.backgroundColor = '#fff';
    qrcode.render();

    // upca
    let upca = new BravoBarCodeBox(document.getElementById('upca'));
    upca.type = CodeType.UPC_A;
    upca.value = '01234567890';
    upca.addOn = 96;
    upca.color = '#222222';
    upca.backgroundColor = '#eeeeee';
    upca.showLabel = true;
    upca.labelPosition = BarCodeLabelPosition.Bottom;
    upca.addOnHeight = 'auto';
    upca.addOnLabelPosition = BarCodeLabelPosition.Top;
    upca.render();

    // upce0
    let upce0 = new BravoBarCodeBox(document.getElementById('upce0'));
    upce0.type = CodeType.UPC_E0;
    upce0.value = '012345';
    upce0.color = '#222222';
    upce0.backgroundColor = '#eeeeee';
    upce0.showLabel = true;
    upce0.labelPosition = BarCodeLabelPosition.Bottom;
    upce0.render();

    // upce1
    let upce1 = new BravoBarCodeBox(document.getElementById('upce1'));
    upce1.type = CodeType.UPC_E1;
    upce1.value = '012345';
    upce1.color = '#222222';
    upce1.backgroundColor = '#eeeeee';
    upce1.showLabel = true;
    upce1.labelPosition = BarCodeLabelPosition.Top;
    upce1.addOn = 99;
    upce1.addOnLabelPosition = BarCodeLabelPosition.Bottom;
    upce1.render();

    /*------------------------------------*/
  }

  /*------------------------------------*/
  // range time
  public timeEvent(min: Date, max: Date) {
    console.log(min, '=>', max);
  }
  /*------------------------------------*/
}
