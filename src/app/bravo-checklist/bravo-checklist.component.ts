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

  private _valueList!: string[];
  public set valueList(pzValueList: string[]) {
    this._valueList = pzValueList;
  }
  public get valueList(): string[] {
    return this._valueList;
  }

  private _zSeparator!: string;
  public set zSeparator(pzValue: string) {
    this._zSeparator = pzValue;
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
  }
  public get listType(): TypeList {
    return this._listType;
  }

  private _controls!: wjc.ObservableArray;
  public set controls(pValue: wjc.ObservableArray) {
    this._controls = pValue;
  }
  public get controls(): wjc.ObservableArray {
    return this._controls;
  }

  constructor(
    @Inject(ElementRef) private elRef: ElementRef,
    @Inject(Injector) injector: Injector
  ) {
    super(WjDirectiveBehavior.getHostElement(elRef, injector));
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  public override refresh(fullUpdate?: boolean) {
    super.refresh(fullUpdate);
  }

  ngOnInit(): void {
    console.log(this.dataList);
  }

  onSelectOption(e: any) {
    console.log(e);
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
