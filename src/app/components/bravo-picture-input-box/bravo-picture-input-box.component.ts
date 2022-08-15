import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as input from '@grapecity/wijmo.input';
import * as wjc from '@grapecity/wijmo';

@Component({
  selector: 'bravo-picture-input-box',
  templateUrl: './bravo-picture-input-box.component.html',
  styleUrls: ['./bravo-picture-input-box.component.scss'],
})
export class BravoPictureInputBoxComponent
  extends wjc.Control
  implements OnInit
{
  private _popup!: input.Popup;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public ngOnInit(): void {
    this._popup = new input.Popup(
      this.hostElement.querySelector('.bravo-picture-popup')
    );
    this._popup.owner = this.hostElement.querySelector(
      '.bravo-picture-dropdown'
    );
    this._popup.showTrigger = input.PopupTrigger.ClickOwner;
    this._popup.hideTrigger = input.PopupTrigger.ClickOrBlur;
  }
}
