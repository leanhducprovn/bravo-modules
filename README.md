# Bravo

Phát triển một số module đơn giản!

## Bravo Slider

Code mẫu:

```html
<bravo-slider
  formControlName="dataSlider"
  [options]="optionsSlider"
></bravo-slider>
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
this.viewSlider.options.floor = 0;
this.viewSlider.options.ceil = 100;
this.viewSlider.options.step = 10;
this.viewSlider.options.noSwitching = true;

// tickStyle
this.viewSlider.tickStyle = SliderTickStyle.Both;
this.viewSlider.tickWidth = "1px";
this.viewSlider.tickHeight = "6px";
this.viewSlider.tickTop = "-2px";
this.viewSlider.tickMarginLeft = "6px";
this.viewSlider.tickColor = "#178BE3";

// barStyle
this.viewSlider.barSize = "2px";
this.viewSlider.barTop = "0px";
this.viewSlider.barColor = "#B9B9B9";
this.viewSlider.barSelectionColor = "#0079D7";

// pointerStyle
this.viewSlider.pointerSize = "12px";
this.viewSlider.pointerTop = "19px";
this.viewSlider.pointerColor = "#1E90FF";
this.viewSlider.pointerBorderSize = "2px";
this.viewSlider.pointerBorderType = "solid";
this.viewSlider.pointerBorderColor = "#FFFFFF";
this.viewSlider.pointerBorderRadius = "100%";

// labelStyle
this.viewSlider.labelDisplayStyle = SliderLabelDisplay.Tick;
this.viewSlider.labelPositionStyle = SliderLabelPosition.Below;
this.viewSlider.labelSize = "13px";
this.viewSlider.labelTop = "12px";
this.viewSlider.labelColor = "inherit";
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
