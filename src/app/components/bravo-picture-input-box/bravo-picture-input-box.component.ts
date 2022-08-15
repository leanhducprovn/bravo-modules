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
  @ViewChild('popup', { static: true }) popup!: input.Popup;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  ngOnInit(): void {
    this.setPopup();
  }

  private setPopup() {
    this.popup.showTrigger = input.PopupTrigger.ClickOwner;
    this.popup.hideTrigger =
      input.PopupTrigger.ClickOwner || input.PopupTrigger.LeavePopup;
  }
}
