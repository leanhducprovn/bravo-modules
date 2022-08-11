// Enum
import { CodeType } from '../types/enum/code-type.enum';

// BarCode
import {
  Codabar,
  Code39,
  Code128,
  Ean8,
  Ean13,
  QrCode,
  UpcA,
  UpcE0,
  UpcE1,
} from '@grapecity/wijmo.barcode.common';
import {
  Code49,
  Code93,
  JapanesePostal,
} from '@grapecity/wijmo.barcode.specialized';
import { Pdf417, MicroPdf417 } from '@grapecity/wijmo.barcode.composite';
import {
  RenderType,
  LabelPosition,
  BarcodeBase,
} from '@grapecity/wijmo.barcode';
import { Code128CodeSet } from '@grapecity/wijmo.barcode.common';

export class BravoBarCodeBox {
  private _element!: any;

  private _type: CodeType = CodeType.None;
  public set type(pValue: CodeType) {
    if (this.type == pValue) return;
    this._type = pValue;
    this.invalidate();
  }
  public get type(): CodeType {
    return this._type;
  }

  private _value: string = 'Bravo';
  public set value(pValue: string) {
    if (this.value == pValue) return;
    this._value = pValue;
    this.invalidate();
  }
  public get value(): string {
    return this._value;
  }

  private _autoWidthZoom: number = 2;
  public set autoWidthZoom(pValue: number) {
    if (this.autoWidthZoom == pValue) return;
    this._autoWidthZoom = pValue;
    this.invalidate();
  }
  public get autoWidthZoom(): number {
    return this._autoWidthZoom;
  }

  private _autoWidth: boolean = true;
  public set autoWidth(pValue: boolean) {
    if (this.autoWidth == pValue) return;
    this._autoWidth = pValue;
    this.invalidate();
  }
  public get autoWidth(): boolean {
    return this._autoWidth;
  }

  private _codeSet: Code128CodeSet = Code128CodeSet.Auto;
  public set codeSet(pValue: number) {
    if (this.codeSet == pValue) return;
    this._codeSet = pValue;
    this.invalidate();
  }
  public get codeSet(): number {
    return this._codeSet;
  }

  private _fullAscii: boolean = false;
  public set fullAscii(pValue: boolean) {
    if (this.fullAscii == pValue) return;
    this._fullAscii = pValue;
    this.invalidate();
  }
  public get fullAscii(): boolean {
    return this._fullAscii;
  }

  private _checkDigit: boolean = false;
  public set checkDigit(pValue: boolean) {
    if (this.checkDigit == pValue) return;
    this._checkDigit = pValue;
    this.invalidate();
  }
  public get checkDigit(): boolean {
    return this._checkDigit;
  }

  private _addOn!: number;
  public set addOn(pValue: number) {
    if (this.addOn == pValue) return;
    this._addOn = pValue;
    this.invalidate();
  }
  public get addOn(): number {
    return this._addOn;
  }

  private _addOnHeight: string | number = 'auto';
  public set addOnHeight(pValue: string | number) {
    if (this.addOnHeight == pValue) return;
    this._addOnHeight = pValue;
    this.invalidate();
  }
  public get addOnHeight(): string | number {
    return this._addOnHeight;
  }

  private _addOnLabelPosition: LabelPosition = LabelPosition.Top;
  public set addOnLabelPosition(pValue: LabelPosition) {
    if (this.addOnLabelPosition == pValue) return;
    this._addOnLabelPosition = pValue;
    this.invalidate();
  }
  public get addOnLabelPosition(): LabelPosition {
    return this._addOnLabelPosition;
  }

  private _color: string = 'rgb(0,0,0)';
  public set color(pValue: string) {
    if (this.color == pValue) return;
    this._color = pValue;
    this.invalidate();
  }
  public get color(): string {
    return this._color;
  }

  private _backgroundColor: string = '#fff';
  public set backgroundColor(pValue: string) {
    if (this.backgroundColor == pValue) return;
    this._backgroundColor = pValue;
    this.invalidate();
  }
  public get backgroundColor(): string {
    return this._backgroundColor;
  }

  private _showLabel: boolean = true;
  public set showLabel(pValue: boolean) {
    if (this.showLabel == pValue) return;
    this._showLabel = pValue;
    this.invalidate();
  }
  public get showLabel(): boolean {
    return this._showLabel;
  }

  private _labelPosition: LabelPosition = LabelPosition.Bottom;
  public set labelPosition(pValue: LabelPosition) {
    if (this.labelPosition == pValue) return;
    this._labelPosition = pValue;
    this.invalidate();
  }
  public get labelPosition(): LabelPosition {
    return this._labelPosition;
  }

  private _hideExtraChecksum: boolean = false;
  public set hideExtraChecksum(pValue: boolean) {
    if (this.hideExtraChecksum == pValue) return;
    this._hideExtraChecksum = pValue;
    this.invalidate();
  }
  public get hideExtraChecksum(): boolean {
    return this._hideExtraChecksum;
  }

  private _renderType: RenderType = RenderType.Svg;
  public set renderType(pValue: RenderType) {
    if (this.renderType == pValue) return;
    this._renderType = pValue;
    this.invalidate();
  }
  public get renderType(): RenderType {
    return this._renderType;
  }

  constructor(_element: any) {
    this._element = _element;
  }

  private _barCode!: any;
  private _zThrowError: string = 'not yet supported!';
  private _zInvalidValue: string = 'Invalid value!';
  private _currentType: CodeType = CodeType.None;

  private invalidate() {
    if (!this._barCode) {
      this.render();
    } else {
      if (this.type != this._currentType) {
        // this._barCode.dispose();
        // this.render();
      }
      let _bIsUpdate = this._barCode.isUpdating;
      if (!_bIsUpdate) this._barCode.beginUpdate();
      try {
        this._currentType = this.type;
        this._barCode.type = this.type;
        this._barCode.value = this.value;
        this._barCode.autoWidthZoom = this.autoWidthZoom;
        this._barCode.autoWidth = this.autoWidth;
        this._barCode.color = this.color;
        this._barCode.backgroundColor = this.backgroundColor;
        this._barCode.showLabel = this.showLabel;
        this._barCode.labelPosition = this.labelPosition;
        this._barCode.hideExtraChecksum = this.hideExtraChecksum;
        this._barCode.renderType = this.renderType;
        this._barCode.fullAscii = this.fullAscii;
        this._barCode.checkDigit = this.checkDigit;
        this._barCode.addOn = this.addOn;
        this._barCode.addOnHeight = this.addOnHeight;
        this._barCode.addOnLabelPosition = this.addOnLabelPosition;
      } finally {
        this._barCode.endUpdate();
      }
    }
  }

  private render() {
    if (this.type == CodeType.None) {
      return;
    } else {
      if (this.type == CodeType.Codabar) {
        this._barCode = new Codabar(this._element);
      } else if (this.type == CodeType.Code39) {
        this._barCode = new Code39(this._element);
      } else if (this.type == CodeType.Ansi39) {
        this._barCode = new Code39(this._element, {
          fullAscii: true,
        });
      } else if (this.type == CodeType.Code49) {
        this._barCode = new Code49(this._element);
      } else if (this.type == CodeType.Code_93) {
        this._barCode = new Code93(this._element);
      } else if (this.type == CodeType.Code_128_A) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.A,
        });
      } else if (this.type == CodeType.Code_128_B) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.B,
        });
      } else if (this.type == CodeType.Code_128_C) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.C,
        });
      } else if (this.type == CodeType.Code_128auto) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.Auto,
        });
      } else if (this.type == CodeType.EAN_8) {
        this._barCode = new Ean8(this._element);
      } else if (this.type == CodeType.EAN_13) {
        this._barCode = new Ean13(this._element);
      } else if (this.type == CodeType.JapanesePostal) {
        this._barCode = new JapanesePostal(this._element);
      } else if (this.type == CodeType.Pdf417) {
        this._barCode = new Pdf417(this._element);
      } else if (this.type == CodeType.MicroPDF417) {
        this._barCode = new MicroPdf417(this._element);
      } else if (this.type == CodeType.QRCode) {
        this._barCode = new QrCode(this._element);
      } else if (this.type == CodeType.UPC_A) {
        this._barCode = new UpcA(this._element);
      } else if (this.type == CodeType.UPC_E0) {
        this._barCode = new UpcE0(this._element);
      } else if (this.type == CodeType.UPC_E1) {
        this._barCode = new UpcE1(this._element);
      } else {
        throw `${CodeType[this.type] + ' ' + this._zThrowError} `;
      }
    }
  }
}
