import { Component, ElementRef, OnInit } from '@angular/core';

import * as input from '@grapecity/wijmo.input';
import * as wjc from '@grapecity/wijmo';

import { Options } from '@angular-slider/ngx-slider';

import { Convert } from '../../library/bravo-convert/convert';

interface SliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'bravo-picture-editor',
  templateUrl: './bravo-picture-editor.component.html',
  styleUrls: [
    './bravo-picture-editor.component.scss',
    './customize-slider.css',
  ],
})
export class BravoPictureEditorComponent extends wjc.Control implements OnInit {
  private _popup!: input.Popup;

  public isZoom: boolean = false;
  public isBrightness: boolean = false;
  public isColor: boolean = false;
  public isBackground: boolean = false;
  public isPopup: boolean = false;

  public zoomSlider!: SliderModel;
  public colorSlider!: SliderModel;
  public backgroundSlider!: SliderModel;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
  }

  public ngOnInit(): void {
    this.setPopup();
    this.setZoomSlider();
    this.setColorSlider();
  }

  private setColorSlider() {
    this.colorSlider = {
      value: 10,
      options: {
        floor: 0,
        ceil: 20,
        step: 1,
        vertical: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  private setZoomSlider() {
    this.zoomSlider = {
      value: 0,
      options: {
        floor: 0,
        ceil: 900,
        vertical: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
        stepsArray: [
          { value: 5 },
          { value: 10 },
          { value: 20 },
          { value: 30 },
          { value: 40 },
          { value: 50 },
          { value: 60 },
          { value: 70 },
          { value: 80 },
          { value: 90 },
          { value: 100 },
          { value: 150 },
          { value: 200 },
          { value: 250 },
          { value: 300 },
          { value: 350 },
          { value: 400 },
          { value: 450 },
          { value: 500 },
          { value: 550 },
          { value: 600 },
          { value: 650 },
          { value: 700 },
          { value: 750 },
          { value: 800 },
          { value: 850 },
          { value: 900 },
        ],
      },
    };
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
