import { Component, Input, OnInit } from '@angular/core';
import { CodeType } from '../data-types/enum/code-type.enum';
import { BravoBarcodeBoxModule } from '../modules/bravo-barcode-box/bravo-barcode-box.module';

@Component({
  selector: 'bravo-barcode-box',
  templateUrl: './bravo-barcode-box.component.html',
  styleUrls: ['./bravo-barcode-box.component.css'],
})
export class BravoBarcodeBoxComponent implements OnInit {
  public CodeType = CodeType;
  public barCode!: BravoBarcodeBoxModule;

  constructor() {}

  ngOnInit(): void {}
}
