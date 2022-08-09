// Enum
import { CodeType } from '../types/enum/code-type.enum';
import { BarCodeLabelPosition } from '../types/enum/barcode-label-position.enum';
import { BarCodeRenderType } from '../types/enum/barcode-render-type.enum';
import { Code128CodeSet } from '../types/enum/code-128-code-set.enum';

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

export class BravoBarCodeBox {
  private _element!: any;

  private _type: CodeType = CodeType.None;
  public set type(pValue: CodeType) {
    this._type = pValue;
    this.invalidate();
  }
  public get type(): CodeType {
    return this._type;
  }

  private _value: string = 'Bravo';
  public set value(pValue: string) {
    this._value = pValue;
    this.invalidate();
  }
  public get value(): string {
    return this._value;
  }

  private _autoWidthZoom: number = 2;
  public set autoWidthZoom(pValue: number) {
    this._autoWidthZoom = pValue;
    this.invalidate();
  }
  public get autoWidthZoom(): number {
    return this._autoWidthZoom;
  }

  private _autoWidth: boolean = true;
  public set autoWidth(pValue: boolean) {
    this._autoWidth = pValue;
    this.invalidate();
  }
  public get autoWidth(): boolean {
    return this._autoWidth;
  }

  private _codeSet!: number;
  public set codeSet(pValue: number) {
    this._codeSet = pValue;
    this.invalidate();
  }
  public get codeSet(): number {
    return this._codeSet;
  }

  private _fullAscii: boolean = false;
  public set fullAscii(pValue: boolean) {
    this._fullAscii = pValue;
    this.invalidate();
  }
  public get fullAscii(): boolean {
    return this._fullAscii;
  }

  private _checkDigit: boolean = false;
  public set checkDigit(pValue: boolean) {
    this._checkDigit = pValue;
    this.invalidate();
  }
  public get checkDigit(): boolean {
    return this._checkDigit;
  }

  private _addOn!: number;
  public set addOn(pValue: number) {
    this._addOn = pValue;
    this.invalidate();
  }
  public get addOn(): number {
    return this._addOn;
  }

  private _addOnHeight: string | number = 'auto';
  public set addOnHeight(pValue: string | number) {
    this._addOnHeight = pValue;
    this.invalidate();
  }
  public get addOnHeight(): string | number {
    return this._addOnHeight;
  }

  private _addOnLabelPosition: BarCodeLabelPosition = BarCodeLabelPosition.Top;
  public set addOnLabelPosition(pValue: BarCodeLabelPosition) {
    this._addOnLabelPosition = pValue;
    this.invalidate();
  }
  public get addOnLabelPosition(): BarCodeLabelPosition {
    return this._addOnLabelPosition;
  }

  private _color: string = 'rgb(0,0,0)';
  public set color(pValue: string) {
    this._color = pValue;
    this.invalidate();
  }
  public get color(): string {
    return this._color;
  }

  private _backgroundColor: string = '#fff';
  public set backgroundColor(pValue: string) {
    this._backgroundColor = pValue;
    this.invalidate();
  }
  public get backgroundColor(): string {
    return this._backgroundColor;
  }

  private _showLabel: boolean = true;
  public set showLabel(pValue: boolean) {
    this._showLabel = pValue;
    this.invalidate();
  }
  public get showLabel(): boolean {
    return this._showLabel;
  }

  private _labelPosition: BarCodeLabelPosition = BarCodeLabelPosition.Bottom;
  public set labelPosition(pValue: BarCodeLabelPosition) {
    this._labelPosition = pValue;
    this.invalidate();
  }
  public get labelPosition(): BarCodeLabelPosition {
    return this._labelPosition;
  }

  private _hideExtraChecksum: boolean = false;
  public set hideExtraChecksum(pValue: boolean) {
    this._hideExtraChecksum = pValue;
    this.invalidate();
  }
  public get hideExtraChecksum(): boolean {
    return this._hideExtraChecksum;
  }

  private _renderType: BarCodeRenderType = BarCodeRenderType.Svg;
  public set renderType(pValue: BarCodeRenderType) {
    this._renderType = pValue;
    this.invalidate();
  }
  public get renderType(): BarCodeRenderType {
    return this._renderType;
  }

  constructor(_element: any) {
    this._element = _element;
  }

  private _barCode!:
    | Codabar
    | Code39
    | Code128
    | Ean8
    | Ean13
    | QrCode
    | UpcA
    | UpcE0
    | UpcE1
    | Code49
    | Code93
    | JapanesePostal
    | Pdf417
    | MicroPdf417;

  private invalidate() {
    if (!this._barCode) {
      this.render();
    }
  }

  public render(): void {
    console.log(this.type, this.value, this.color);
    try {
      if (this.type == CodeType.None) {
        return;
      } else if (this.type == CodeType.Codabar) {
        this._barCode = new Codabar(this._element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Code39) {
        this._barCode = new Code39(this._element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Ansi39) {
        this._barCode = new Code39(this._element, {
          fullAscii: true,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Code49) {
        this._barCode = new Code49(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Code_93) {
        this._barCode = new Code93(this._element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Code_128_A) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.A,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Code_128_B) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.B,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Code_128_C) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.C,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Code_128auto) {
        this._barCode = new Code128(this._element, {
          codeSet: Code128CodeSet.Auto,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.EAN_8) {
        this._barCode = new Ean8(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.EAN_13) {
        this._barCode = new Ean13(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.JapanesePostal) {
        this._barCode = new JapanesePostal(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Pdf417) {
        this._barCode = new Pdf417(this._element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.MicroPDF417) {
        this._barCode = new MicroPdf417(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.QRCode) {
        this._barCode = new QrCode(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          hideExtraChecksum: this.hideExtraChecksum,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.UPC_A) {
        this._barCode = new UpcA(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.UPC_E0) {
        this._barCode = new UpcE0(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.UPC_E1) {
        this._barCode = new UpcE1(this._element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
          renderType: this.renderType,
        });
        this._barCode.invalidate();
      } else if (this.type == CodeType.Ansi39x) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.Code_2_of_5) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.Code25intlv) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.Matrix_2_of_5) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.Code39x) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.Code93x) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.MSI) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.PostNet) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RM4SCC) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.UCCEAN128) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.EAN128FNC1) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RSS14) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RSS14Truncated) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RSS14Stacked) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RSS14StackedOmnidirectional) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RSSExpanded) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RSSExpandedStacked) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.RSSLimited) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.DataMatrix) {
        throw 'Not yet supported!';
      } else if (this.type == CodeType.IntelligentMail) {
        throw 'Not yet supported!';
      }
    } catch (error) {
      console.log(error);
    }
  }
}
