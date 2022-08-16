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
  // @ViewChild('popup', { static: true }) private _popup!: input.Popup;

  private _popup!: input.Popup;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  private setPopup() {
    wjc.setCss(this.hostElement.querySelector('.bravo-picture-popup'), {
      width: '300px',
      height: '200px',
      borderRadius: 'unset',
    });
    this._popup = new input.Popup(
      this.hostElement.querySelector('.bravo-picture-popup'),
      {
        owner: this.hostElement.querySelector('.bravo-picture-dropdown'),
        position: wjc.PopupPosition.BelowRight,
        showTrigger: input.PopupTrigger.ClickOwner,
        hideTrigger: input.PopupTrigger.Blur | input.PopupTrigger.ClickOwner,
        isResizable: true,
      }
    );
  }

  public showPopup() {
    this._popup.show();
  }
}
