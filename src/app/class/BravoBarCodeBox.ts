// Enum
import { CodeType } from '../data-types/enum/code-type.enum';
import { BarCodeLabelPosition } from '../data-types/enum/barcode-label-position.enum';
import { Code128CodeSet } from '../data-types/enum/code-128-code-set.enum';

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
  public element!: any;
  public type!: CodeType;
  public value!: string;
  public autoWidthZoom: number = 2;
  public autoWidth: boolean = true;
  public codeSet!: number;
  public fullAscii: boolean = false;
  public checkDigit: boolean = false;
  public addOn!: number;
  public addOnHeight: string | number = 'auto';
  public addOnLabelPosition: BarCodeLabelPosition = BarCodeLabelPosition.Top;
  public color: string = 'rgb(0,0,0)';
  public backgroundColor: string = '#fff';
  public showLabel: boolean = true;
  public labelPosition: BarCodeLabelPosition = BarCodeLabelPosition.Bottom;
  public hideExtraChecksum: boolean = false;

  public render(): void {
    try {
      if (this.type == CodeType.Codabar) {
        new Codabar(this.element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.Code39) {
        new Code39(this.element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.Ansi39) {
        new Code39(this.element, {
          fullAscii: true,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.Code49) {
        new Code49(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
        });
      } else if (this.type == CodeType.Code_93) {
        new Code93(this.element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
        });
      } else if (this.type == CodeType.Code_128_A) {
        new Code128(this.element, {
          codeSet: Code128CodeSet.A,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.Code_128_B) {
        new Code128(this.element, {
          codeSet: Code128CodeSet.B,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.Code_128_C) {
        new Code128(this.element, {
          codeSet: Code128CodeSet.C,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.Code_128auto) {
        new Code128(this.element, {
          codeSet: Code128CodeSet.Auto,
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.EAN_8) {
        new Ean8(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.EAN_13) {
        new Ean13(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
        });
      } else if (this.type == CodeType.JapanesePostal) {
        new JapanesePostal(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.Pdf417) {
        new Pdf417(this.element, {
          value: this.value,
          autoWidthZoom: this.autoWidthZoom,
          autoWidth: this.autoWidth,
          color: this.color,
          backgroundColor: this.backgroundColor,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.MicroPDF417) {
        new MicroPdf417(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.QRCode) {
        new QrCode(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          hideExtraChecksum: this.hideExtraChecksum,
        });
      } else if (this.type == CodeType.UPC_A) {
        new UpcA(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
        });
      } else if (this.type == CodeType.UPC_E0) {
        new UpcE0(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
        });
      } else if (this.type == CodeType.UPC_E1) {
        new UpcE1(this.element, {
          value: this.value,
          color: this.color,
          backgroundColor: this.backgroundColor,
          showLabel: this.showLabel,
          labelPosition: this.labelPosition,
          hideExtraChecksum: this.hideExtraChecksum,
          addOn: this.addOn,
          addOnHeight: this.addOnHeight,
          addOnLabelPosition: this.addOnLabelPosition,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
