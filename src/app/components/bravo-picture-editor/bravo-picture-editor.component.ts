import { Component, ElementRef, OnInit } from '@angular/core';

import * as input from '@grapecity/wijmo.input';
import * as wjc from '@grapecity/wijmo';

import { Convert } from '../../library/bravo-convert/convert';

@Component({
  selector: 'bravo-picture-editor',
  templateUrl: './bravo-picture-editor.component.html',
  styleUrls: ['./bravo-picture-editor.component.scss'],
})
export class BravoPictureEditorComponent extends wjc.Control implements OnInit {
  private _popup!: input.Popup;

  public isZoom: boolean = false;
  public isBrightness: boolean = false;
  public isColor: boolean = false;
  public isBackground: boolean = false;
  public isPopup: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  private setPopup() {
    this._popup = new input.Popup(
      this.hostElement.querySelector('.bravo-picture-editor-popup'),
      {
        owner: this.hostElement?.querySelector('.bravo-picture-more'),
        position: wjc.PopupPosition.AboveRight,
        showTrigger: input.PopupTrigger.ClickOwner,
        hideTrigger:
          input.PopupTrigger.Blur |
          input.PopupTrigger.ClickOwner |
          input.PopupTrigger.Leave,
      }
    );
    this._popup.shown.addHandler((e: input.Popup) => {
      this.isPopup = e.isVisible;
    });
    this._popup.hidden.addHandler((e: input.Popup) => {
      this.isPopup = e.isVisible;
    });
  }
}
