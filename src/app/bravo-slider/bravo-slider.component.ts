import {
  ChangeContext,
  Options,
  PointerType,
} from '@angular-slider/ngx-slider';
import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as wjc from '@grapecity/wijmo';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SliderTickStyle } from '../data-types/enum/slider-tick-style';

@Component({
  selector: 'bravo-slider',
  templateUrl: './bravo-slider.component.html',
  styleUrls: ['./bravo-slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BravoSliderComponent),
    },
  ],
})
export class BravoSliderComponent
  extends wjc.Control
  implements OnInit, ControlValueAccessor, AfterContentInit
{
  @Input()
  public value!: number;

  @Input()
  public highValue!: number;

  private _options: Options = new Options();
  @Input()
  public set options(pValue: Options) {
    this._options = pValue;
    this.invalidate();
  }
  public get options(): Options {
    return this._options;
  }

  private _isArray!: boolean;

  // custom slider

  // tickStyle
  private _tickStyle: SliderTickStyle = SliderTickStyle.None;
  @Input()
  public set tickStyle(pValue: SliderTickStyle) {
    this._tickStyle = pValue;
    this.invalidate();
  }
  public get tickStyle(): SliderTickStyle {
    return this._tickStyle;
  }

  private _tickWidth: string = '1px';
  @Input()
  public set tickWidth(pValue: string) {
    this._tickWidth = pValue;
    this.invalidate();
  }
  public get tickWidth(): string {
    return this._tickWidth;
  }

  private _tickHeight: string = '10px';
  @Input()
  public set tickHeight(pValue: string) {
    this._tickHeight = pValue;
    this.invalidate();
  }
  public get tickHeight(): string {
    return this._tickHeight;
  }

  private _tickTop: string = '-4px';
  @Input()
  public set tickTop(pValue: string) {
    this._tickTop = pValue;
    this.invalidate();
  }
  public get tickTop(): string {
    return this._tickTop;
  }

  private _tickMarginLeft: string = '6px';
  @Input()
  public set tickMarginLeft(pValue: string) {
    this._tickMarginLeft = pValue;
    this.invalidate();
  }
  public get tickMarginLeft(): string {
    return this._tickMarginLeft;
  }

  private _tickColor: string = '#178BE3';
  @Input()
  public set tickColor(pValue: string) {
    this._tickColor = pValue;
    this.invalidate();
  }
  public get tickColor(): string {
    return this._tickColor;
  }

  // barStyle
  private _barSize: string = '2px';
  @Input()
  public set barSize(pValue: string) {
    this._barSize = pValue;
    this.invalidate();
  }
  public get barSize(): string {
    return this._barSize;
  }

  private _barTop: string = '0px';
  @Input()
  public set barTop(pValue: string) {
    this._barTop = pValue;
    this.invalidate();
  }
  public get barTop(): string {
    return this._barTop;
  }

  private _barColor: string = '#B9B9B9';
  @Input()
  public set barColor(pValue: string) {
    this._barColor = pValue;
    this.invalidate();
  }
  public get barColor(): string {
    return this._barColor;
  }

  private _barSelectionColor: string = '#0079D7';
  @Input()
  public set barSelectionColor(pValue: string) {
    this._barSelectionColor = pValue;
    this.invalidate();
  }
  public get barSelectionColor(): string {
    return this._barSelectionColor;
  }

  // pointerStyle
  private _pointerSize: string = '12px';
  @Input()
  public set pointerSize(pValue: string) {
    this._pointerSize = pValue;
  }
  public get pointerSize(): string {
    return this._pointerSize;
  }

  private _pointerTop: string = '19px';
  @Input()
  public set pointerTop(pValue: string) {
    this._pointerTop = pValue;
  }
  public get pointerTop(): string {
    return this._pointerTop;
  }

  private _pointerColor: string = '#1E90FF';
  @Input()
  public set pointerColor(pValue: string) {
    this._pointerColor = pValue;
  }
  public get pointerColor(): string {
    return this._pointerColor;
  }

  private _pointerBorderSize: string = '2px';
  @Input()
  public set pointerBorderSize(pValue: string) {
    this._pointerBorderSize = pValue;
  }
  public get pointerBorderSize(): string {
    return this._pointerBorderSize;
  }

  private _pointerBorderType: string = 'solid';
  @Input()
  public set pointerBorderType(pValue: string) {
    this._pointerBorderType = pValue;
  }
  public get pointerBorderType(): string {
    return this._pointerBorderType;
  }

  private _pointerBorderColor: string = '#FFFFFF';
  @Input()
  public set pointerBorderColor(pValue: string) {
    this._pointerBorderColor = pValue;
  }
  public get pointerBorderColor(): string {
    return this._pointerBorderColor;
  }

  private _pointerBorderRadius: string = '100%';
  @Input()
  public set pointerBorderRadius(pValue: string) {
    this._pointerBorderRadius = pValue;
  }
  public get pointerBorderRadius(): string {
    return this._pointerBorderRadius;
  }

  // labelDisplayStyle

  // labelPositionStyle

  @Output() valueEvent = new EventEmitter<any>();
  @Output() highValueEvent = new EventEmitter<any>();

  public constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public onChangeCallback = (value: any) => {};
  public onTouchedCallback = (value: any) => {};

  public writeValue(obj: any): void {
    if (obj instanceof Array) {
      this.value = obj[0];
      this.highValue = obj[1];
      this._isArray = true;
    } else {
      this.value = obj;
      this._isArray = false;
    }
  }

  public registerOnChange(onChangeCallback: any): void {
    this.onChangeCallback = onChangeCallback;
  }

  public registerOnTouched(onTouchedCallback: any): void {
    this.onTouchedCallback = onTouchedCallback;
  }

  public override refresh(fullUpdate?: boolean): void {
    super.refresh(fullUpdate);
    this.setTickStyle(
      this.tickStyle,
      this.tickWidth,
      this.tickHeight,
      this.tickTop,
      this.tickMarginLeft,
      this.tickColor
    );
    this.setBarStyle(
      this.barSize,
      this.barTop,
      this.barColor,
      this.barSelectionColor
    );
    this.setPointerStyle(
      this.pointerSize,
      this.pointerTop,
      this.pointerColor,
      this.pointerBorderSize,
      this.pointerBorderType,
      this.pointerBorderColor,
      this.pointerBorderRadius
    );
  }

  public ngAfterContentInit(): void {
    this.setTickStyle(
      this.tickStyle,
      this.tickWidth,
      this.tickHeight,
      this.tickTop,
      this.tickMarginLeft,
      this.tickColor
    );
    this.setBarStyle(
      this.barSize,
      this.barTop,
      this.barColor,
      this.barSelectionColor
    );
  }

  public ngOnInit(): void {}

  // set style

  public setTickStyle(
    pTickStyle: SliderTickStyle,
    pTickWidth: string,
    pTickHeight: string,
    pTickTop: string,
    pTickMarginLeft: string,
    pTickColor: string
  ) {
    if (pTickStyle == SliderTickStyle.None) {
      this.options.showTicks = false;
    } else {
      this.options.showTicks = true;
      this.getCollection('ngx-slider-tick').forEach((element) => {
        if (pTickStyle == SliderTickStyle.Both) {
          wjc.setCss(element, {
            width: pTickWidth,
            height: pTickHeight,
            top: pTickTop,
            marginLeft: pTickMarginLeft,
            background: pTickColor,
            borderRadius: 'unset',
          });
        } else if (pTickStyle == SliderTickStyle.TopLeft) {
          wjc.setCss(element, {
            width: pTickWidth,
            height:
              Number(pTickHeight.slice(0, pTickHeight.length - 2)) / 2 +
              pTickHeight.slice(-2),
            top: pTickTop,
            marginLeft: pTickMarginLeft,
            background: pTickColor,
            borderRadius: 'unset',
          });
        } else if (pTickStyle == SliderTickStyle.BottomRight) {
          wjc.setCss(element, {
            width: pTickWidth,
            height:
              Number(pTickHeight.slice(0, pTickHeight.length - 2)) / 2 +
              pTickHeight.slice(-2),
            top: '5px',
            marginLeft: pTickMarginLeft,
            background: pTickColor,
            borderRadius: 'unset',
          });
        }
      });
    }
  }

  public setBarStyle(
    pBarSize: string,
    pBarTop: string,
    pBarColor: string,
    pBarSelectionColor: string
  ) {
    this.options.showSelectionBar = true;
    this.getCollection('ngx-slider-bar').forEach((element) => {
      wjc.setCss(element, {
        height: pBarSize,
        top: pBarTop,
        background: pBarColor,
      });
    });
    this.getCollection('ngx-slider-selection').forEach((element) => {
      wjc.setCss(element, {
        background: pBarSelectionColor,
      });
    });
  }

  public setPointerStyle(
    pPointerSize: string,
    pPointerTop: string,
    pPointerColor: string,
    pPointerBorderSize: string,
    pPointerBorderType: string,
    pPointerBorderColor: string,
    pPointerBorderRadius: string
  ) {
    this.getCollection('ngx-slider-pointer').forEach((element) => {
      wjc.setCss(element, {
        width: pPointerSize,
        height: pPointerSize,
        top: pPointerTop,
        background: pPointerColor,
        border:
          pPointerBorderSize +
          ' ' +
          pPointerBorderType +
          ' ' +
          pPointerBorderColor,
        borderRadius: pPointerBorderRadius,
      });
    });
  }

  public setLabelDisplayStyle() {}

  public setLabelPositionStyle() {}

  private getCollection(zClassName: string) {
    return Array.from(
      document.getElementsByClassName(
        zClassName
      ) as HTMLCollectionOf<HTMLElement>
    );
  }

  bubble(boolean: boolean) {
    const bubble = Array.from(
      document.getElementsByClassName(
        'ngx-slider-bubble'
      ) as HTMLCollectionOf<HTMLElement>
    );
    bubble.forEach((element) => {
      wjc.toggleClass(element, 'hidden', !boolean);
    });
  }

  // get event

  public onUserChangeStart(changeContext: ChangeContext): void {
    if (this._isArray) {
      this.onChangeCallback([changeContext.value, changeContext.highValue]);
    } else {
      this.onChangeCallback(changeContext.value);
    }
  }

  public onUserChange(changeContext: ChangeContext): void {
    this.getChangeContextString(changeContext);
  }

  public onUserChangeEnd(changeContext: ChangeContext): void {
    if (this._isArray) {
      this.onChangeCallback([changeContext.value, changeContext.highValue]);
    } else {
      this.onChangeCallback(changeContext.value);
    }
  }

  private getChangeContextString(changeContext: ChangeContext): string {
    if (changeContext.pointerType == 0) {
      this.valueEvent.emit(changeContext.value);
    } else if (changeContext.pointerType == 1) {
      this.highValueEvent.emit(changeContext.highValue);
    }
    return (
      `${changeContext.pointerType === PointerType.Min ? 'min' : 'max'}, ` +
      `${changeContext.value}, ` +
      `${changeContext.highValue}`
    );
  }
}
