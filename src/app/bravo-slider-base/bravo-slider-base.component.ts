import { Options } from '@angular-slider/ngx-slider';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

// wijmo
import * as wjc from '@grapecity/wijmo';

// enum
import { SliderTickStyle } from '../data-types/enum/slider-tick-style.enum';
import { SliderLabelDisplay } from '../data-types/enum/slider-label-display.enum';
import { SliderLabelPosition } from '../data-types/enum/slider-label-position.enum';
import { Font } from '../bravo-graphics/font';
import { BravoGraphicsRenderer } from '../bravo-graphics/bravo.graphics.renderer';

@Component({
  selector: 'bravo-slider-base',
  templateUrl: './bravo-slider-base.component.html',
  styleUrls: ['./bravo-slider-base.component.css'],
})
export class BravoSliderBaseComponent
  extends wjc.Control
  implements OnInit, AfterViewInit
{
  // options
  private _options: Options = new Options();
  @Input()
  public set options(pValue: Options) {
    this._options = pValue;
    this.invalidate();
  }
  public get options(): Options {
    return this._options;
  }

  // tick style
  private _tickStyle: SliderTickStyle = SliderTickStyle.None;
  @Input()
  public set tickStyle(pValue: SliderTickStyle) {
    this._tickStyle = pValue;
    this.invalidate();
  }
  public get tickStyle(): SliderTickStyle {
    return this._tickStyle;
  }

  // label style
  private _labelDisplay: SliderLabelDisplay = SliderLabelDisplay.Tick;
  @Input()
  public set labelDisplay(pValue: SliderLabelDisplay) {
    this._labelDisplay = pValue;
    this.invalidate();
  }
  public get labelDisplay(): SliderLabelDisplay {
    return this._labelDisplay;
  }

  private _labelPosition: SliderLabelPosition = SliderLabelPosition.Below;
  @Input()
  public set labelPosition(pValue: SliderLabelPosition) {
    this._labelPosition = pValue;
    this.invalidate();
  }
  public get labelPosition(): SliderLabelPosition {
    return this._labelPosition;
  }

  public constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  ngAfterViewInit(): void {
    this.setLabelDisplay(this.labelDisplay);
  }

  public override refresh(fullUpdate?: boolean): void {
    super.refresh(fullUpdate);
    this.setTickStyle(this.tickStyle);
    this.setLabelPosition(this.labelPosition);
  }

  public ngOnInit(): void {
    this.setTickStyle(this.tickStyle);
    this.setLabelDisplay(this.labelDisplay);
  }

  // get legend
  public getLegend(value: number): string {
    return `${value}`;
  }

  // set tick style
  public setTickStyle(pTickStyle: SliderTickStyle) {
    if (pTickStyle == SliderTickStyle.None) {
      this.options.showTicks = false;
    } else {
      this.options.showTicks = true;
      this.getCollection('ngx-slider-tick').forEach((element) => {
        if (pTickStyle == SliderTickStyle.Both) {
          return;
        } else if (pTickStyle == SliderTickStyle.TopLeft) {
          wjc.setCss(element, {
            height: '2px',
          });
        } else if (pTickStyle == SliderTickStyle.BottomRight) {
          wjc.setCss(element, {
            height: '2px',
            top: '2px',
          });
        } else {
          wjc.setCss(element, {
            width: '0px',
            height: '0px',
          });
        }
      });
    }
  }

  // set label display
  public setLabelDisplay(pLabelDisplay: SliderLabelDisplay) {
    if (this.tickStyle == SliderTickStyle.None) {
      this.getCollection('ngx-slider-tick').forEach((element) => {
        wjc.setCss(element, {
          width: '0px',
          height: '0px',
        });
      });
    }
    if (pLabelDisplay == SliderLabelDisplay.None) {
      this.options.ticksArray = [];
    } else if (pLabelDisplay == SliderLabelDisplay.MinMax) {
      this.options.ticksArray = [this.options.floor!, this.options.ceil!];
    } else {
      // chuyền vào 1 mảng bất kỳ
      this.options.ticksArray = [10, 30, 50, 70, 90];
    }
  }

  // set label position
  public setLabelPosition(pLabelPosition: SliderLabelPosition) {
    if (pLabelPosition == SliderLabelPosition.Above) {
      this.getCollection('slider-base').forEach((element) => {
        wjc.addClass(element, 'label-above');
      });
      this.getCollection('ngx-slider-tick-legend').forEach((element) => {
        if (this.tickStyle == SliderTickStyle.BottomRight) {
          wjc.setCss(element, {
            top: '-24px',
          });
        } else {
          wjc.setCss(element, {
            top: '-20px',
          });
        }
      });
      this.getCollection('ngx-slider-bubble').forEach((element) => {
        wjc.setCss(element, {
          top: '-45px',
        });
      });
    } else {
      this.getCollection('ngx-slider-tick-legend').forEach((element) => {
        if (this.tickStyle == SliderTickStyle.BottomRight) {
          wjc.setCss(element, {
            top: '6px',
          });
        }
      });
    }
  }

  // Tooltip chỉ hiển thị khi kéo
  private _isToolTip!: boolean;
  private _startValue!: number;
  private _changeValue!: number;

  public onUserChangeStart(event: any) {
    this._startValue = event.value;
  }

  public onUserChange(event: any) {
    this._changeValue = event.value;
    if (event.value != this._startValue) {
      this._isToolTip = true;
    }
  }

  public onUserChangeEnd(event: any) {
    if (event.value == this._changeValue) {
      this._isToolTip = false;
      this.getCollection('ngx-slider-bubble').forEach((element) => {
        wjc.addClass(element, 'remove-slider-tooltip');
      });
    }
  }

  public onValueChange(event: any) {
    this.getCollection('ngx-slider-bubble').forEach((element) => {
      wjc.toggleClass(element, 'remove-slider-tooltip', !this._isToolTip);
    });
  }

  // get collection
  private getCollection(...className: Array<string>) {
    const _elements = new Array<HTMLElement>();
    for (const zClassName of className) {
      _elements.push(
        ...Array.from(
          this.hostElement?.getElementsByClassName(
            zClassName
          ) as HTMLCollectionOf<HTMLElement>
        )
      );
    }
    return _elements;
  }

  // get size
  public getPreferredSize() {
    let _control = new wjc.Size();
    let _fontSize = new Font('Segoe UI', (9.75 / 100) * 85);
    if (this.labelDisplay == SliderLabelDisplay.None) {
      _control = new wjc.Size(200, 14);
      return _control;
    } else {
      _control = new wjc.Size(
        200,
        6 +
          4 +
          Number(BravoGraphicsRenderer.measureString('0', _fontSize)?.height)
      );
      return _control;
    }
  }
}
