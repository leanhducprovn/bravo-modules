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

  private _isEdit: boolean = false;
  public set isEdit(pValue: boolean) {
    if (this._isEdit == pValue) return;
    this._isEdit = pValue;
    this.invalidate();
  }
  public get isEdit(): boolean {
    return this._isEdit;
  }

  public isPopup: boolean = false;
  public editStyle!: string;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
    this.renderUI();
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  public onZoom() {
    this.isZoom = !this.isZoom;
    this.isEdit = false;
  }

  public onEdit(style: string) {
    this.isEdit = !this.isEdit;
    this.isZoom = false;
    this.editStyle = style;
  }

  private renderUI() {
    let _view = this.hostElement?.querySelector('.bravo-picture-view');
    let _preview = this.hostElement?.querySelector('.bravo-picture-preview');
    let _edit = this.hostElement?.querySelector('.bravo-picture-edit');

    // onZoom
    if (_preview) {
      if (this.isZoom) {
        wjc.setCss(_preview, {
          width: 'calc(100% - 40px)',
        });
      } else {
        wjc.setCss(_preview, {
          width: '100%',
        });
      }
    }

    // onBrightness
    if (_view && _edit) {
      if (this.isEdit) {
        wjc.setCss(_edit, {
          width: '100px',
        });
        wjc.setCss(_view, {
          width: 'calc(100% - 100px)',
        });
      } else {
        wjc.setCss(_edit, {
          width: '0px',
        });
        wjc.setCss(_view, {
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
