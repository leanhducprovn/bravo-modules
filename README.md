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

**P/s**: Đang phát triển...
