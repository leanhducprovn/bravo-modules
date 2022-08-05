import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BravoBarcodeBoxComponent } from '../../bravo-barcode-box/bravo-barcode-box.component';

// Barcode Box
import { WjBarcodeCommonModule } from '@grapecity/wijmo.angular2.barcode.common';
import { WjBarcodeSpecializedModule } from '@grapecity/wijmo.angular2.barcode.specialized';
import { WjBarcodeCompositeModule } from '@grapecity/wijmo.angular2.barcode.composite';

// Enum
import { CodeType } from '../../data-types/enum/code-type.enum';

@NgModule({
  declarations: [BravoBarcodeBoxComponent],
  imports: [
    CommonModule,
    WjBarcodeCommonModule,
    WjBarcodeSpecializedModule,
    WjBarcodeCompositeModule,
  ],
  exports: [BravoBarcodeBoxComponent],
})
export class BravoBarcodeBoxModule {
  public type!: CodeType;
  public value!: string;
}
