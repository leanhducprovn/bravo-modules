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
