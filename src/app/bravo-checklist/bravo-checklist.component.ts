import {
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Control } from '@grapecity/wijmo';
import { WjDirectiveBehavior } from '@grapecity/wijmo.angular2.directivebase';
import { FlowDirection } from '../data-types/enum/flow-direction';
import { AppearanceStyleEnum } from '../data-types/enum/appearance-style-enum';
import { BravoGraphicsRenderer } from '../bravo-graphics/bravo.graphics.renderer';
import { Font } from '../bravo-graphics/font';

import * as wjc from '@grapecity/wijmo';

@Component({
  selector: 'bravo-checklist',
  templateUrl: './bravo-checklist.component.html',
  styleUrls: ['./bravo-checklist.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BravoChecklistComponent),
    },
  ],
})
export class BravoChecklistComponent
  extends Control
  implements OnInit, ControlValueAccessor
{
  @ViewChild('parent', { static: true }) viewParent!: any;
  @ViewChild('children', { static: true }) viewChildren!: any;

  public FlowDirection = FlowDirection;
  public AppearanceStyleEnum = AppearanceStyleEnum;

  private _zParentText!: string;
  @Input()
  public set zParentText(pzValue: string) {
    this._zParentText = pzValue;
    this.invalidate();
  }
  public get zParentText(): string {
    return this._zParentText;
  }

  private _zSeparator!: string;
  @Input()
  public set zSeparator(pzValue: string) {
    this._zSeparator = pzValue;
    this.invalidate();
  }
  public get zSeparator(): string {
    if (!this._zSeparator) {
      this._zSeparator = ',';
    }
    return this._zSeparator;
  }

  private _bAllowSelectMultiValue: boolean = true;
  @Input()
  public set bAllowSelectMultiValue(pbValue: boolean) {
    this._bAllowSelectMultiValue = pbValue;
    this.invalidate();
  }
  public get bAllowSelectMultiValue(): boolean {
    return this._bAllowSelectMultiValue;
  }

  private _dataList!: DataList[];
  @Input()
  public set dataList(pValue: DataList[]) {
    this._dataList = pValue;
    this.invalidate();
  }
  public get dataList(): DataList[] {
    return this._dataList;
  }

  private _eAppearanceStyle: AppearanceStyleEnum = AppearanceStyleEnum.Checkbox;
  @Input()
  public set eAppearanceStyle(pValue: AppearanceStyleEnum) {
    this._eAppearanceStyle = pValue;
    this.invalidate();
  }
  public get eAppearanceStyle(): AppearanceStyleEnum {
    return this._eAppearanceStyle;
  }

  private _eFlowDirection: FlowDirection = FlowDirection.LeftToRight;
  @Input()
  public set eFlowDirection(pValue: FlowDirection) {
    this._eFlowDirection = pValue;
    this.invalidate();
  }
  public get eFlowDirection(): FlowDirection {
    return this._eFlowDirection;
  }

  private _controls!: wjc.ObservableArray;
  public set controls(pValue: wjc.ObservableArray) {
    this._controls = pValue;
    this.invalidate();
  }
  public get controls(): wjc.ObservableArray {
    if (!this._controls) {
      this._controls = new wjc.ObservableArray();
    }
    return this._controls;
  }

  private _valueList!: string[];
  public set valueList(pValue: string[]) {
    this._valueList = pValue;
    this.invalidate();
  }
  public get valueList(): string[] {
    if (!this._valueList) {
      this._valueList = [];
    }
    return this._valueList;
  }

  constructor(
    @Inject(ElementRef) private elRef: ElementRef,
    @Inject(Injector) injector: Injector
  ) {
    super(WjDirectiveBehavior.getHostElement(elRef, injector));
  }

  public onChange = (changed: any) => {};
  public onTouch = () => {};
  public writeValue(obj: any): void {
    if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        this.valueList[i] = obj[i];
      }
    } else {
      this.valueList = obj.split(this.zSeparator);
    }
  }
  public registerOnChange(changed: any): void {
    this.onChange = changed;
  }
  public registerOnTouched(touched: any): void {
    this.onTouch = touched;
  }

  public override refresh(fullUpdate?: boolean) {
    super.refresh(fullUpdate);
    this.setData(this.dataList);
    this.setFlowDirection(this.eFlowDirection);
  }

  public ngOnInit(): void {}

  public onParent(e: any) {
    for (let i = 0; i < this.controls.length; i++) {
      this.controls[i].checked = e.target.checked;
      if (this.controls[i].checked) {
        if (this.valueList.indexOf(this.controls[i].value) == -1) {
          this.valueList.push(this.controls[i].value);
        }
      } else {
        this.valueList = [];
      }
    }
    console.log(this.valueList);
  }

  public onChildren(e: any) {
    if (e.target.checked) {
      if (this.bAllowSelectMultiValue) {
        if (this.valueList.indexOf(e.target.value) === -1) {
          this.valueList.push(e.target.value);
        }
        console.log(this.valueList);
      } else {
        for (let i = 0; i < this.controls.length; i++) {
          if (this.controls[i].value !== e.target.value) {
            this.controls[i].checked = false;
          }
        }
        this.valueList = [];
        this.valueList.push(e.target.value);
        console.log(this.valueList);
      }
    } else {
      if (this.valueList.indexOf(e.target.value) !== -1) {
        this.valueList.splice(this.valueList.indexOf(e.target.value), 1);
      }
      console.log(this.valueList);
    }
    this.viewParent.checked = this.controls.every(
      (option) => option.checked == true
    );
  }

  private addOption(zName: string, zText: string, zValue: any) {
    let _option = this.controls.find((item) => item.name == zName);
    if (!_option) {
      _option = new BravoOptionBox(zName, zText, zValue);
      this.controls.push(_option);
    }
    this.onActive();
  }

  private onActive() {
    for (let i = 0; i < this.controls.length; i++) {
      for (let j = 0; j < this.valueList.length; j++) {
        if (this.controls[i].value == this.valueList[j]) {
          this.controls[i].checked = true;
        }
      }
    }
    this.viewParent.checked = this.controls.every(
      (option) => option.checked == true
    );
  }

  private setData(value: DataList[]) {
    for (let i = 0; i < value.length; i++) {
      this.addOption(value[i].name, value[i].text, value[i].value);
    }
  }

  private setFlowDirection(value: FlowDirection) {
    let _style!: string;
    if (value == FlowDirection.LeftToRight) {
      _style = 'row';
    } else if (value == FlowDirection.RightToLeft) {
      _style = 'row-reverse';
    } else if (value == FlowDirection.TopDown) {
      _style = 'column';
    } else if (value == FlowDirection.BottomUp) {
      _style = 'column-reverse';
    } else {
      _style = 'row';
    }
    wjc.setCss(this.viewChildren.nativeElement, {
      'flex-flow': _style,
    });
  }

  public getCurrentDisplayText(pzSeparator: string) {}

  public getPreferredSize() {}
}

export interface DataList {
  name: string;
  text: string;
  value: string;
}

export class BravoOptionBox {
  private _name!: string;
  public set name(pzValue: string) {
    this._name = pzValue;
  }
  public get name(): string {
    return this._name;
  }

  private _text!: string;
  public set text(pzValue: string) {
    this._text = pzValue;
  }
  public get text(): string {
    return this._text;
  }

  private _value!: string;
  public set value(pzValue: string) {
    this._value = pzValue;
  }
  public get value(): string {
    return this._value;
  }

  constructor(zName: string, zText: string, zValue: string) {
    this.name = zName;
    this.text = zText;
    this.value = zValue;
  }
}
