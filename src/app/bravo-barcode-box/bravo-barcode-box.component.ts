import { Component, Input, OnInit } from '@angular/core';
import { CodeType } from '../data-types/enum/code-type.enum';

@Component({
  selector: 'bravo-barcode-box',
  templateUrl: './bravo-barcode-box.component.html',
  styleUrls: ['./bravo-barcode-box.component.css'],
})
export class BravoBarcodeBoxComponent implements OnInit {
  public CodeType = CodeType;

  @Input()
  private _type: CodeType = CodeType.QRCode;
  public set type(pValue: CodeType) {
    this._type = pValue;
  }
  public get type(): CodeType {
    return this._type;
  }

  @Input()
  private _value: string = 'Bravo';
  public set value(pValue: string) {
    this._value = pValue;
  }
  public get value(): string {
    return this._value;
  }

  constructor() {}

  ngOnInit(): void {}
}

export class BravoBarCodeBox {
  type!: CodeType;
  value!: string;
  constructor(type: CodeType, value: string) {
    (this.type = type), (this.value = value);
  }
}
