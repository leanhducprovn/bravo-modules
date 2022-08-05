// Enum
import { CodeType } from '../data-types/enum/code-type.enum';
import { LabelPosition } from '../data-types/enum/label-position.enum';
import { Code128CodeSet } from '../data-types/enum/code-128-code-set.enum';

// BarCode
import {
  Codabar,
  Code39,
  Code128,
  Code128A,
  Code128B,
  Code128C,
  Code128Auto,
} from '@grapecity/wijmo.barcode.common';
import { Code49, Code93 } from '@grapecity/wijmo.barcode.specialized';

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
  public color: string = 'rgb(0,0,0)';
  public backgroundColor: string = '#fff';
  public showLabel: boolean = true;
  public labelPosition: LabelPosition = LabelPosition.Bottom;
  public hideExtraChecksum: boolean = false;

  public render(fullUpdate?: boolean): void {
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
    }
  }
}
