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
    return this._zSeparator;
  }

  private _bAllowSelectMultiValue = true;
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

  private _typeList!: AppearanceStyleEnum;
  @Input()
  public set typeList(pnValue: AppearanceStyleEnum) {
    this._typeList = pnValue;
    this.invalidate();
  }
  public get typeList(): AppearanceStyleEnum {
    if (!this._typeList) {
      this._typeList = AppearanceStyleEnum.Checkbox;
    }
    return this._typeList;
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

        //  if (this.checkAppearance == AppearanceStyleEnum.Button) {
        //    e.target.parentElement.className += ' active';
        //  }

        if (this.typeList == AppearanceStyleEnum.Button) {
        }

        console.log(this.valueList);
      } else {
        for (let i = 0; i < this.controls.length; i++) {
          if (this.controls[i].value !== e.target.value) {
            this.controls[i].checked = false;
          }
        }

        //  if (this.checkAppearance == AppearanceStyleEnum.Button) {
        //    var current = document.getElementsByClassName('active');
        //    if (current.length > 0) {
        //      current[0].className = current[0].className.replace(' active', '');
        //    }
        //    e.target.parentElement.className += ' active';
        //  }

        this.valueList = [];
        this.valueList.push(e.target.value);

        console.log(this.valueList);
      }
    } else {
      if (this.valueList.indexOf(e.target.value) !== -1) {
        this.valueList.splice(this.valueList.indexOf(e.target.value), 1);
      }

      console.log(this.valueList);

      //  if (this.checkAppearance == AppearanceStyleEnum.Button) {
      //    e.target.parentElement.className = 'button-appearance';
      //  }
    }

    this.viewParent.checked = this.controls.every(
      (option) => option.checked == true
    );
    //  this.onChange(this.valueList.join(this.zValueListSeparator));
  }

  private addOption(pzName: string, pzText: string, pValue: any) {
    let _option = this.controls.find((item) => item.name == pzName);
    if (_option == null) {
      _option = new BravoOptionBox(pzName, pzText, pValue);
      this.controls.push(_option);
    }
    // this.updateCheckBox();
  }

  // private updateCheckBox() {
  //   for (let i = 0; i < this.controls.length; i++) {
  //     for (let j = 0; j < this.valueList.length; j++) {
  //       if (this.controls[i].value == this.valueList[j]) {
  //         this.controls[i].checked = true;
  //       }
  //     }
  //   }
  //   this.viewParent.nativeElement.checked = this.controls.every(
  //     (option) => option.checked == true
  //   );
  // }
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
