import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

// wijmo
import * as wjc from '@grapecity/wijmo';

// enum
import { SliderTickStyle } from '../data-types/enum/slider-tick-style';
import { SliderLabelDisplay } from '../data-types/enum/slider-label-display';
import { SliderLabelPosition } from '../data-types/enum/slider-label-position';

@Component({
  selector: 'bravo-slider-base',
  templateUrl: './bravo-slider-base.component.html',
  styleUrls: ['./bravo-slider-base.component.css'],
})
export class BravoSliderBaseComponent extends wjc.Control implements OnInit {
  // default options
  public options: Options = {
    floor: 0,
    ceil: 100,
    tickStep: 10,
    showTicks: true,
    ticksArray: undefined,
    showSelectionBar: true,
    getLegend: this.getLegend,
  };

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

  public override refresh(fullUpdate?: boolean): void {
    super.refresh(fullUpdate);
  }

  public ngOnInit(): void {}

  public getLegend(value: number): string {
    return `${value}`;
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
}
