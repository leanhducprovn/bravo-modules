# Bravo

Phát triển một số module đơn giản!

## Bravo Slider Base

Code mẫu:

```html
<bravo-slider-base #sliderBase></bravo-slider-base>
```

```ts
// options
this.viewSliderBase.options.floor = 0;
this.viewSliderBase.options.ceil = 100;
this.viewSliderBase.options.showSelectionBar = true;
this.viewSliderBase.options.getLegend = this.viewSliderBase.getLegend;

// tick style
this.viewSliderBase.tickStyle = SliderTickStyle.BottomRight;

// label display
this.viewSliderBase.labelDisplay = SliderLabelDisplay.Tick;

// label position
this.viewSliderBase.labelPosition = SliderLabelPosition.Below;
```

## Bravo Range Slider

Code mẫu:

```html
<form [formGroup]="formRangeSlider">
  <bravo-range-slider #rangeSlider formControlName="dataRangeSlider">
  </bravo-range-slider>
</form>
```

```ts
// default slider
this.formSlider = this.fb.group({
  dataSlider: [[10, 90]],
});

// get event
this.formSlider.valueChanges.subscribe((value) => {
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
this.viewRangeSlider.tickWidth = "1px";
this.viewRangeSlider.tickHeight = "6px";
this.viewRangeSlider.tickTop = "-2px";
this.viewRangeSlider.tickMarginLeft = "6px";
this.viewRangeSlider.tickColor = "#178BE3";

// barStyle
this.viewRangeSlider.barSize = "2px";
this.viewRangeSlider.barTop = "0px";
this.viewRangeSlider.barColor = "#B9B9B9";
this.viewRangeSlider.barSelectionColor = "#0079D7";

// pointerStyle
this.viewRangeSlider.pointerSize = "12px";
this.viewRangeSlider.pointerTop = "19px";
this.viewRangeSlider.pointerColor = "#1E90FF";
this.viewRangeSlider.pointerBorderSize = "2px";
this.viewRangeSlider.pointerBorderType = "solid";
this.viewRangeSlider.pointerBorderColor = "#FFFFFF";
this.viewRangeSlider.pointerBorderRadius = "100%";

// labelStyle
this.viewRangeSlider.labelDisplayStyle = SliderLabelDisplay.Tick;
this.viewRangeSlider.labelPositionStyle = SliderLabelPosition.Below;
this.viewRangeSlider.labelSize = "13px";
this.viewRangeSlider.labelTop = "12px";
this.viewRangeSlider.labelColor = "inherit";
```

## Bravo Range Time

Code mẫu:

```html
<bravo-range-time
  [listMonth]="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
  [listQuarter]="['I', 'II', 'III', 'IV']"
  [listYear]="[2019, 2020, 2021, 2022, 2023, 2024, 2025]"
  (timeEvent)="timeEvent($event.minTime, $event.maxTime)"
>
</bravo-range-time>
```

## Bravo CheckList

Code mẫu:

```html
<!-- Dạng Checkbox, chỉ được phép chọn 1 giá trị -->
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
</form>
```
