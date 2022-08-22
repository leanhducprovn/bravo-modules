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

  private _isZoom: boolean = false;
  public set isZoom(pValue: boolean) {
    if (this._isZoom == pValue) return;
    this._isZoom = pValue;
    this.invalidate();
  }
  public get isZoom(): boolean {
    return this._isZoom;
  }

  private _isBrightness: boolean = false;
  public set isBrightness(pValue: boolean) {
    if (this._isBrightness == pValue) return;
    this._isBrightness = pValue;
    this.invalidate();
  }
  public get isBrightness(): boolean {
    return this._isBrightness;
  }

  private _isColor: boolean = false;
  public set isColor(pValue: boolean) {
    if (this._isColor == pValue) return;
    this._isColor = pValue;
    this.invalidate();
  }
  public get isColor(): boolean {
    return this._isColor;
  }

  private _isBackground: boolean = false;
  public set isBackground(pValue: boolean) {
    if (this._isBackground == pValue) return;
    this._isBackground = pValue;
    this.invalidate();
  }
  public get isBackground(): boolean {
    return this._isBackground;
  }

  public isPopup: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
    this.renderUI();
    console.log(1);
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  public onZoom() {
    this.isZoom = !this.isZoom;
    this.isBrightness = false;
    this.isColor = false;
    this.isBackground = false;
  }

  public onBrightness() {
    this.isBrightness = !this.isBrightness;
    this.isZoom = false;
    this.isColor = false;
    this.isBackground = false;
  }

  public onColor() {
    this.isColor = !this.isColor;
    this.isZoom = false;
    this.isBrightness = false;
    this.isBackground = false;
  }

  public onBackground() {
    this.isBackground = !this.isBackground;
    this.isZoom = false;
    this.isBrightness = false;
    this.isColor = false;
  }

  private renderUI() {
    let _preview = this.hostElement?.querySelector('.bravo-picture-preview');
    if (_preview) {
      if (this.isZoom) {
        wjc.setCss(_preview, {
          width: 'calc(100% - 50px)',
        });
      } else if (this.isBrightness) {
        wjc.setCss(_preview, {
          width: 'calc(100% - 100px)',
        });
      } else if (this.isColor) {
        wjc.setCss(_preview, {
          width: 'calc(100% - 50px)',
        });
      } else if (this.isBackground) {
        wjc.setCss(_preview, {
          width: 'calc(100% - 50px)',
        });
      } else {
        wjc.setCss(_preview, {
          width: '100%',
        });
      }
    }
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
