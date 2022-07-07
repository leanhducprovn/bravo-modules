import {
  Component,
  ElementRef,
  Inject,
  Injector,
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

  private _zText!: string;
  public set zText(pzValue: string) {
    this._zText = pzValue;
  }
  public get zText(): string {
    return this._zText;
  }

  private _bAllowSelectMultiValue!: boolean;
  public set bAllowSelectMultiValue(pbValue: boolean) {
    this._bAllowSelectMultiValue = pbValue;
  }
  public get bAllowSelectMultiValue(): boolean {
    return this._bAllowSelectMultiValue;
  }

  private _listType!: ListType;
  public set listType(pnValue: ListType) {
    this._listType = pnValue;
  }
  public get listType(): ListType {
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

  ngOnInit(): void {}
}

enum ListType {
  Checkbox,
  Button,
}
