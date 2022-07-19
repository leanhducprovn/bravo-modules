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
    // console.log(this.getPreferredSize());
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

  public getCurrentDisplayText(pzSeparator: string) {
    let _currentText: string;
    let _listText = [];
    for (let i = 0; i < this.controls.length; i++) {
      for (let j = 0; j < this.valueList.length; j++) {
        if (this.controls[i].value == this.valueList[j]) {
          _currentText = this.controls[i].text;
          _listText.push(_currentText);
        }
      }
    }
    return _listText.join(pzSeparator);
  }

  public getPreferredSize() {
    let _fontSize = new Font('Segoe UI', 9.75);
    let _sControl = new wjc.Size();
    let _sParent = new wjc.Size();
    let _sChildren = new wjc.Size();
    let _nwParent: number = 0;
    let _nhParent: number = 0;
    let _nwChildren: number = 0;
    let _nhChildren: number = 0;
    let _nwButton: number = 0;
    let _nhButton: number = 0;

    if (this.eAppearanceStyle == AppearanceStyleEnum.Button) {
      // kiểu button

      /*------------------------------------- 
      3: margin
      3: padding
      --------------------------------------*/
      if (
        this.eFlowDirection == FlowDirection.LeftToRight ||
        this.eFlowDirection == FlowDirection.RightToLeft
      ) {
        // từ trái sang phải và từ phải sang trái
        let _nwButtonText: number = 0;
        let _nhButtonText: number = 0;
        for (let i = 0; i < this.controls.length; i++) {
          _nwButtonText += Number(
            BravoGraphicsRenderer.measureString(
              this.controls[i].text,
              _fontSize
            )?.width
          );
          _nhButtonText = Number(
            BravoGraphicsRenderer.measureString(
              this.controls[i].text,
              _fontSize
            )?.height
          );
        }
        _nwButton = _nwButtonText + (3 * 2 + 3 * 2) * 3 - 3;
        _nhButton = 3 + 3 + _nhButtonText + 3 + 3;
        _sControl = new wjc.Size(_nwButton, _nhButton);
      } else if (
        this.eFlowDirection == FlowDirection.TopDown ||
        this.eFlowDirection == FlowDirection.BottomUp
      ) {
        // từ trên xuống dưới và từ dưới lên trên
        let _nwButtonText: number = 0;
        let _nhButtonText: number = 0;
        let _awButtonText: number[] = [];
        for (let i = 0; i < this.controls.length; i++) {
          _awButtonText.push(
            Number(
              BravoGraphicsRenderer.measureString(
                this.controls[i].text,
                _fontSize
              )?.width
            )
          );
          if (_nwButtonText <= _awButtonText[i]) {
            _nwButtonText = _awButtonText[i];
          }
          _nhButtonText += Number(
            BravoGraphicsRenderer.measureString(
              this.controls[i].text,
              _fontSize
            )?.height
          );
        }
        _nwButton = 3 + 3 + _nwButtonText + 3 + 3 - 3;
        _nhButton = _nhButtonText + (3 * 2 + 3 * 2) * 3;
        _sControl = new wjc.Size(_nwButton, _nhButton);
      }
      return _sControl;
    } else {
      // kiểu checklist hoặc null

      // parent
      /*------------------------------------- 
      13: chiều rộng, chiều cao của checkbox
      4: margin trái phải của text
      18: margin left đầu dòng của children
      --------------------------------------*/

      if (this.zParentText) {
        let _sParentText = new wjc.Size(
          BravoGraphicsRenderer.measureString(
            this.zParentText,
            _fontSize
          )?.width,
          BravoGraphicsRenderer.measureString(
            this.zParentText,
            _fontSize
          )?.height
        );
        _nwParent = 13 + 4 + _sParentText.width + 4;
        if (_sParentText.height <= 13) {
          _nhParent = 13;
        } else {
          _nhParent = _sParentText.height;
        }
        _sParent = new wjc.Size(_nwParent, _nhParent);
      } else {
        _sParent = new wjc.Size(13, 13);
      }

      // children
      if (
        this.eFlowDirection == FlowDirection.LeftToRight ||
        this.eFlowDirection == FlowDirection.RightToLeft
      ) {
        // từ trái sang phải và từ phải sang trái
        let _nwChildrenText: number = 0;
        let _nhChildrenText: number = 0;
        for (let i = 0; i < this.controls.length; i++) {
          _nwChildrenText += Number(
            BravoGraphicsRenderer.measureString(
              this.controls[i].text,
              _fontSize
            )?.width
          );
          _nhChildrenText = Number(
            BravoGraphicsRenderer.measureString(
              this.controls[i].text,
              _fontSize
            )?.height
          );
        }
        _nwChildren =
          18 +
          13 * this.controls.length +
          8 * this.controls.length +
          _nwChildrenText;
        if (_nhChildrenText <= 13) {
          _nhChildren = 13;
        } else {
          _nhChildren = _nhChildrenText;
        }
        _sChildren = new wjc.Size(_nwChildren, _nhChildren);
      } else if (
        this.eFlowDirection == FlowDirection.TopDown ||
        this.eFlowDirection == FlowDirection.BottomUp
      ) {
        // từ trên xuống dưới và từ dưới lên trên
        let _nwChildrenText: number = 0;
        let _nhChildrenText: number = 0;
        let _awChildrenText: number[] = [];
        for (let i = 0; i < this.controls.length; i++) {
          _awChildrenText.push(
            Number(
              BravoGraphicsRenderer.measureString(
                this.controls[i].text,
                _fontSize
              )?.width
            )
          );
          if (_nwChildrenText <= _awChildrenText[i]) {
            _nwChildrenText = _awChildrenText[i];
          }
          _nhChildrenText += Number(
            BravoGraphicsRenderer.measureString(
              this.controls[i].text,
              _fontSize
            )?.height
          );
        }
        _nwChildren = 18 + 13 + 4 + _nwChildrenText + 4;
        if (_nhChildrenText <= 13) {
          _nhChildren = 13;
        } else {
          _nhChildren = _nhChildrenText;
        }
        _sChildren = new wjc.Size(_nwChildren, _nhChildren);
      }

      // return
      if (_sParent.width >= _sChildren.width) {
        // parent lớn hơn hoặc bằng children
        _sControl = new wjc.Size(
          _sParent.width,
          _sParent.height + _sChildren.height
        );
        return _sControl;
      } else {
        // children lớn hơn parent
        _sControl = new wjc.Size(
          _sChildren.width,
          _sParent.height + _sChildren.height
        );
        return _sControl;
      }
    }
  }
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
