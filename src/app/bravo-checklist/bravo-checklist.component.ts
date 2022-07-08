import {
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Control } from '@grapecity/wijmo';
import { WjDirectiveBehavior } from '@grapecity/wijmo.angular2.directivebase';
import { BravoGraphicsRenderer } from '../bravo-graphics/bravo.graphics.renderer';
import { Font } from '../bravo-graphics/font';

import * as wjc from '@grapecity/wijmo';

@Component({
  selector: 'bravo-checklist',
  templateUrl: './bravo-checklist.component.html',
  styleUrls: ['./bravo-checklist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BravoChecklistComponent,
      multi: true,
    },
  ],
})
export class BravoChecklistComponent
  extends Control
  implements OnInit, ControlValueAccessor
{
  @ViewChild('parent', { static: true }) viewParent!: any;
  @ViewChild('children', { static: true }) viewChildren!: ElementRef;

  private _zParentText!: string;
  @Input()
  public set zParentText(pzValue: string) {
    this._zParentText = pzValue;
    this.invalidate();
  }
  public get zParentText(): string {
    return this._zParentText;
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

  private _dataSelected!: DataList[];
  public set dataSelected(pValue: DataList[]) {
    this._dataSelected = pValue;
    this.invalidate();
  }
  public get dataSelected(): DataList[] {
    if (!this._dataSelected) {
      this._dataSelected = [];
    }
    return this._dataSelected;
  }

  private _valueList!: string[];
  public set valueList(pzValue: string[]) {
    this._valueList = pzValue;
    this.invalidate();
  }
  public get valueList(): string[] {
    if (!this._valueList) {
      this._valueList = [];
    }
    return this._valueList;
  }

  private _zSeparator!: string;
  public set zSeparator(pzValue: string) {
    this._zSeparator = pzValue;
    this.invalidate();
  }
  public get zSeparator(): string {
    return this._zSeparator;
  }

  private _bSelectOnlyOne!: boolean;
  @Input()
  public set bSelectOnlyOne(pbValue: boolean) {
    this._bSelectOnlyOne = pbValue;
    this.invalidate();
  }
  public get bSelectOnlyOne(): boolean {
    return this._bSelectOnlyOne;
  }

  private _listType!: TypeList;
  public set listType(pnValue: TypeList) {
    this._listType = pnValue;
    this.invalidate();
  }
  public get listType(): TypeList {
    return this._listType;
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

  constructor(
    @Inject(ElementRef) private elRef: ElementRef,
    @Inject(Injector) injector: Injector
  ) {
    super(WjDirectiveBehavior.getHostElement(elRef, injector));
  }

  public writeValue(obj: any): void {}
  public registerOnChange(fn: any): void {}
  public registerOnTouched(fn: any): void {}

  public override refresh(fullUpdate?: boolean) {
    super.refresh(fullUpdate);
    for (let i = 0; i < this.dataList.length; i++) {
      this.addOption(
        this.dataList[i].name,
        this.dataList[i].text,
        this.dataList[i].value
      );
    }
  }

  public ngOnInit(): void {}

  onSelectOption(e: any) {
    if (e.target.checked) {
      if (this.bSelectOnlyOne) {
        this.dataSelected = [];
        this.dataSelected.push({
          name: e.target.name,
          text: e.target.parentElement.innerText,
          value: e.target.value,
        });

        for (let i = 0; i < this.controls.length; i++) {
          if (this.controls[i].value !== e.target.value) {
            this.controls[i].checked = false;
          }
        }
      } else {
        if (this.valueList.indexOf(e.target.value) == -1) {
          this.valueList.push(e.target.value);
        }
      }
    } else {
      if (this.valueList.indexOf(e.target.value) !== -1) {
        this.valueList.splice(this.valueList.indexOf(e.target.value), 1);
      }
    }

    ['rtrt', 'ghg'].join(this.zSeparator);

    console.log(this.dataSelected);
    // this.viewCheckList.checked = this.controls.every(
    //   (option) => option.checked == true
    // );
    // this.onChange(this.valueList.join(this.zValueListSeparator));
  }

  public onSelectAll(e: any) {
    for (let i = 0; i < this.controls.length; i++) {
      this.controls[i].checked = e.target.checked;
      if (this.controls[i].checked) {
        if (this.dataSelected.indexOf(this.controls[i].name) == -1) {
          this.dataSelected.push({
            name: this.controls[i].name,
            text: this.controls[i].text,
            value: this.controls[i].value,
          });
        }
      } else {
        this.dataSelected = [];
      }
    }
    console.log(this.dataSelected);
  }

  public addOption(pzName: string, pzText: string, pValue: any) {
    let _option = this.controls.find((item) => item.name == pzName);
    if (!_option) {
      _option = new BravoOptionBox(pzName, pzText, pValue);
      this.controls.push(_option);
    }
  }

  public updateCheckBox() {
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
}

export interface DataList {
  name: string;
  text: string;
  value: string;
}

enum TypeList {
  Checkbox,
  Button,
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
