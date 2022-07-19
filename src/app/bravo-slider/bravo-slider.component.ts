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

  private _options!: Options;
  @Input()
  public set options(pValue: Options) {
    this._options = pValue;
    this.invalidate();
  }
  public get options(): Options {
    return this._options;
  }

  private _tickStyle!: SliderTickStyle;
  @Input()
  public set tickStyle(pValue: SliderTickStyle) {
    this._tickStyle = pValue;
    this.invalidate();
  }
  public get tickStyle(): SliderTickStyle {
    if (!this._tickStyle) {
      this._tickStyle = SliderTickStyle.None;
    }
    return this._tickStyle;
  }

  private _isBubble!: boolean;
  @Input()
  public get isBubble(): boolean {
    return this._isBubble;
  }
  public set isBubble(v: boolean) {
    if (this._isBubble == v) {
      return;
    }
    this._isBubble = v;
    this.invalidate();
  }

  private _pointerColor!: string;
  @Input()
  public get pointerColor(): string {
    return this._pointerColor;
  }
  public set pointerColor(v: string) {
    if (this._pointerColor == v) {
      return;
    }
    this._pointerColor = v;
    this.invalidate();
  }

  private _pointerSize!: number;
  @Input()
  public get pointerSize(): number {
    return this._pointerSize;
  }
  public set pointerSize(v: number) {
    if (this._pointerSize == v) {
      return;
    }
    this._pointerSize = v;
    this.invalidate();
  }

  private _pointerTop!: number;
  @Input()
  public get pointerTop(): number {
    return this._pointerTop;
  }
  public set pointerTop(v: number) {
    if (this._pointerTop == v) {
      return;
    }
    this._pointerTop = v;
    this.invalidate();
  }

  private _pointerBorder!: string;
  @Input()
  public get pointerBorder(): string {
    return this._pointerBorder;
  }
  public set pointerBorder(v: string) {
    if (this._pointerBorder == v) {
      return;
    }
    this._pointerBorder = v;
    this.invalidate();
  }

  private _barColor!: string;
  @Input()
  public get barColor(): string {
    return this._barColor;
  }
  public set barColor(v: string) {
    if (this._barColor == v) {
      return;
    }
    this._barColor = v;
    this.invalidate();
  }

  private _barSize!: number;
  @Input()
  public get barSize(): number {
    return this._barSize;
  }
  public set barSize(v: number) {
    if (this._barSize == v) {
      return;
    }
    this._barSize = v;
    this.invalidate();
  }

  private _selectionColor!: string;
  @Input()
  public get selectionColor(): string {
    return this._selectionColor;
  }
  public set selectionColor(v: string) {
    if (this._selectionColor == v) {
      return;
    }
    this._selectionColor = v;
    this.invalidate();
  }

  private _tickType!: string;
  @Input()
  public get tickType(): string {
    return this._tickType;
  }
  public set tickType(v: string) {
    if (this._tickType == v) {
      return;
    }
    this._tickType = v;
    this.invalidate();
  }

  private _tickColor!: string;
  @Input()
  public get tickColor(): string {
    return this._tickColor;
  }
  public set tickColor(v: string) {
    if (this._tickColor == v) {
      return;
    }
    this._tickColor = v;
    this.invalidate();
  }

  private _tickBackground!: string;
  @Input()
  public get tickBackground(): string {
    return this._tickBackground;
  }
  public set tickBackground(v: string) {
    if (this._tickBackground == v) {
      return;
    }
    this._tickBackground = v;
    this.invalidate();
  }

  private _tickTop!: number;
  @Input()
  public get tickTop(): number {
    return this._tickTop;
  }
  public set tickTop(v: number) {
    if (this._tickTop == v) {
      return;
    }
    this._tickTop = v;
    this.invalidate();
  }

  @Output() valueEvent = new EventEmitter<any>();
  @Output() highValueEvent = new EventEmitter<any>();

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }
  ngAfterContentInit(): void {
    this.setTickStyle(this.tickStyle);
  }

  array!: boolean;

  onChangeCallback = (value: any) => {};
  onTouchedCallback = (value: any) => {};

  writeValue(obj: any): void {
    if (obj instanceof Array) {
      this.value = obj[0];
      this.highValue = obj[1];
      this.array = true;
    } else {
      this.value = obj;
      this.array = false;
    }
  }

  registerOnChange(onChangeCallback: any): void {
    this.onChangeCallback = onChangeCallback;
  }

  registerOnTouched(onTouchedCallback: any): void {
    this.onTouchedCallback = onTouchedCallback;
  }

  override refresh(fullUpdate?: boolean): void {
    this.setTickStyle(this.tickStyle);

    // this.bubble(this.isBubble);
    // this.pointer(
    //   this.pointerColor,
    //   this.pointerSize,
    //   this.pointerTop,
    //   this.pointerBorder
    // );
    // this.bar(this.barColor, this.barSize);
    // this.selection(this.selectionColor);
    // this.tick(this.tickType, this.tickColor, this.tickBackground, this.tickTop);
  }

  ngOnInit(): void {
    this.options = {
      floor: 0,
      ceil: 100,
      step: 10,
    };
  }

  public setTickStyle(pValue: SliderTickStyle) {
    if (pValue == SliderTickStyle.None) {
      this.options.showTicks = true;
    }
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

  pointer(color: string, size: number, top: number, border: string) {
    const pointer = Array.from(
      document.getElementsByClassName(
        'ngx-slider-pointer'
      ) as HTMLCollectionOf<HTMLElement>
    );
    pointer.forEach((element) => {
      wjc.setCss(element, {
        backgroundColor: color,
        maxWidth: size + 'px',
        maxHeight: size + 'px',
        top: top + 'px',
        border: border,
        borderRadius: '100%',
      });
    });
  }

  bar(color: string, size: number) {
    const selection = Array.from(
      document.getElementsByClassName(
        'ngx-slider-bar'
      ) as HTMLCollectionOf<HTMLElement>
    );
    selection.forEach((element) => {
      wjc.setCss(element, {
        backgroundColor: color,
        height: size + 'px',
      });
    });
  }

  selection(color: string) {
    const selection = Array.from(
      document.getElementsByClassName(
        'ngx-slider-selection'
      ) as HTMLCollectionOf<HTMLElement>
    );
    selection.forEach((element) => {
      wjc.setCss(element, {
        backgroundColor: color,
      });
    });
  }

  tick(type: string, color: string, background: string, top: number) {
    const tick = Array.from(
      document.getElementsByClassName(
        'ngx-slider-tick'
      ) as HTMLCollectionOf<HTMLElement>
    );
    tick.forEach((element) => {
      if (type == 'vertical') {
        wjc.setCss(element, {
          width: '1px',
          height: '5px',
          background: background,
          color: color,
          borderRadius: 'unset',
          marginTop: top + 'px',
        });
      } else if (type == 'circle') {
        wjc.setCss(element, {
          width: '15px',
          height: '15px',
          top: '-3px',
          borderRadius: '100%',
          background: background,
          color: color,
          marginTop: top + 'px',
        });
      }
    });
  }

  onUserChangeStart(changeContext: ChangeContext): void {
    if (this.array) {
      this.onChangeCallback([changeContext.value, changeContext.highValue]);
    } else {
      this.onChangeCallback(changeContext.value);
    }
  }

  onUserChange(changeContext: ChangeContext): void {
    this.getChangeContextString(changeContext);
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    if (this.array) {
      this.onChangeCallback([changeContext.value, changeContext.highValue]);
    } else {
      this.onChangeCallback(changeContext.value);
    }
  }

  getChangeContextString(changeContext: ChangeContext): string {
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
